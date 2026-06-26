CREATE OR REPLACE FUNCTION public.apply_inventory_movement(
  _product_id uuid,
  _movement_type movement_type,
  _quantity numeric,
  _warehouse_id uuid,
  _warehouse_dest_id uuid DEFAULT NULL,
  _reason text DEFAULT NULL,
  _notes text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _movement_id uuid;
  _uid uuid := auth.uid();
  _is_staff boolean;
BEGIN
  SELECT public.is_staff(_uid) INTO _is_staff;
  IF NOT _is_staff THEN
    RAISE EXCEPTION 'forbidden: solo personal puede registrar movimientos';
  END IF;

  IF _quantity <= 0 THEN
    RAISE EXCEPTION 'la cantidad debe ser mayor a 0';
  END IF;

  IF _movement_type IN ('entrada','devolucion') THEN
    IF _warehouse_id IS NULL THEN RAISE EXCEPTION 'almacén destino requerido'; END IF;
    INSERT INTO public.inventory_stock(product_id, warehouse_id, quantity)
    VALUES (_product_id, _warehouse_id, _quantity)
    ON CONFLICT (product_id, warehouse_id) DO UPDATE SET quantity = inventory_stock.quantity + EXCLUDED.quantity, updated_at = now();

  ELSIF _movement_type IN ('salida','venta') THEN
    IF _warehouse_id IS NULL THEN RAISE EXCEPTION 'almacén origen requerido'; END IF;
    UPDATE public.inventory_stock
    SET quantity = quantity - _quantity, updated_at = now()
    WHERE product_id = _product_id AND warehouse_id = _warehouse_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'no hay stock para descontar'; END IF;

  ELSIF _movement_type = 'transferencia' THEN
    IF _warehouse_id IS NULL OR _warehouse_dest_id IS NULL THEN RAISE EXCEPTION 'origen y destino requeridos'; END IF;
    IF _warehouse_id = _warehouse_dest_id THEN RAISE EXCEPTION 'origen y destino deben ser distintos'; END IF;
    UPDATE public.inventory_stock SET quantity = quantity - _quantity, updated_at = now()
    WHERE product_id = _product_id AND warehouse_id = _warehouse_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'no hay stock para transferir'; END IF;
    INSERT INTO public.inventory_stock(product_id, warehouse_id, quantity)
    VALUES (_product_id, _warehouse_dest_id, _quantity)
    ON CONFLICT (product_id, warehouse_id) DO UPDATE SET quantity = inventory_stock.quantity + EXCLUDED.quantity, updated_at = now();

  ELSIF _movement_type = 'ajuste' THEN
    IF _warehouse_id IS NULL THEN RAISE EXCEPTION 'almacén requerido'; END IF;
    INSERT INTO public.inventory_stock(product_id, warehouse_id, quantity)
    VALUES (_product_id, _warehouse_id, _quantity)
    ON CONFLICT (product_id, warehouse_id) DO UPDATE SET quantity = EXCLUDED.quantity, updated_at = now();

  ELSE
    RAISE EXCEPTION 'tipo de movimiento no soportado: %', _movement_type;
  END IF;

  INSERT INTO public.inventory_movements(product_id, warehouse_id, warehouse_dest_id, movement_type, quantity, reason, notes, created_by)
  VALUES (_product_id, _warehouse_id, _warehouse_dest_id, _movement_type, _quantity, _reason, _notes, _uid)
  RETURNING id INTO _movement_id;

  RETURN _movement_id;
END;
$$;

REVOKE ALL ON FUNCTION public.apply_inventory_movement(uuid, movement_type, numeric, uuid, uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.apply_inventory_movement(uuid, movement_type, numeric, uuid, uuid, text, text) TO authenticated;