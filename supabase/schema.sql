-- ============================================================
-- Hablemos de Terror — Schema completo para Supabase
-- Ejecutar en el SQL Editor de Supabase
-- ============================================================

-- Habilitar extensión para UUIDs
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- TABLA: relatos
-- ─────────────────────────────────────────────────────────────
create table if not exists public.relatos (
  id            uuid primary key default gen_random_uuid(),
  titulo        text not null,
  contenido     text not null,
  autor_nombre  text not null,
  autor_email   text,
  ciudad        text,
  categoria     text,
  es_real       boolean not null default false,
  audio_url     text,
  status        text not null default 'pendiente'
                  check (status in ('pendiente', 'aprobado', 'rechazado', 'publicado')),
  slug          text unique,
  publicado_at  timestamptz,
  created_at    timestamptz not null default now()
);

-- Índices útiles
create index if not exists relatos_status_idx     on public.relatos (status);
create index if not exists relatos_slug_idx       on public.relatos (slug);
create index if not exists relatos_created_at_idx on public.relatos (created_at desc);

-- RLS
alter table public.relatos enable row level security;

-- Público puede leer solo los publicados
create policy "relatos_select_publicados"
  on public.relatos for select
  using (status = 'publicado');

-- Cualquiera puede enviar un relato (INSERT público)
create policy "relatos_insert_publico"
  on public.relatos for insert
  with check (true);

-- Solo service_role puede actualizar o eliminar
create policy "relatos_update_service_role"
  on public.relatos for update
  using (auth.role() = 'service_role');

create policy "relatos_delete_service_role"
  on public.relatos for delete
  using (auth.role() = 'service_role');


-- ─────────────────────────────────────────────────────────────
-- TABLA: testimonios
-- ─────────────────────────────────────────────────────────────
create table if not exists public.testimonios (
  id                uuid primary key default gen_random_uuid(),
  nombre            text not null,
  email             text,
  ciudad            text,
  titulo_testimonio text not null,
  categoria         text,
  es_real           boolean not null default false,
  contenido         text not null,
  status            text not null default 'pendiente'
                      check (status in ('pendiente', 'aprobado', 'rechazado', 'publicado')),
  created_at        timestamptz not null default now()
);

create index if not exists testimonios_status_idx     on public.testimonios (status);
create index if not exists testimonios_created_at_idx on public.testimonios (created_at desc);

alter table public.testimonios enable row level security;

create policy "testimonios_insert_publico"
  on public.testimonios for insert
  with check (true);

create policy "testimonios_select_service_role"
  on public.testimonios for select
  using (auth.role() = 'service_role');

create policy "testimonios_update_service_role"
  on public.testimonios for update
  using (auth.role() = 'service_role');


-- ─────────────────────────────────────────────────────────────
-- TABLA: episodios
-- ─────────────────────────────────────────────────────────────
create table if not exists public.episodios (
  id            uuid primary key default gen_random_uuid(),
  titulo        text not null,
  descripcion   text,
  audio_url     text not null,
  duracion_seg  integer,
  imagen_url    text,
  categoria     text,
  temporada     integer not null default 1,
  numero        integer not null,
  transcripcion text,
  publicado_at  timestamptz,
  created_at    timestamptz not null default now(),
  -- constraint de unicidad por temporada + número
  unique (temporada, numero)
);

create index if not exists episodios_temporada_numero_idx on public.episodios (temporada, numero);
create index if not exists episodios_publicado_at_idx     on public.episodios (publicado_at desc);

-- RLS
alter table public.episodios enable row level security;

-- SELECT público para todos (episodios son contenido abierto)
create policy "episodios_select_todos"
  on public.episodios for select
  using (true);

-- INSERT/UPDATE/DELETE solo service_role
create policy "episodios_insert_service_role"
  on public.episodios for insert
  with check (auth.role() = 'service_role');

create policy "episodios_update_service_role"
  on public.episodios for update
  using (auth.role() = 'service_role');

create policy "episodios_delete_service_role"
  on public.episodios for delete
  using (auth.role() = 'service_role');


-- ─────────────────────────────────────────────────────────────
-- TABLA: membresias
-- ─────────────────────────────────────────────────────────────
create table if not exists public.membresias (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users (id) on delete cascade,
  nivel             text not null
                      check (nivel in ('visitante', 'primigenio', 'cazador', 'ancestral')),
  precio_mxn        decimal(10, 2),
  activa            boolean not null default true,
  proveedor_pago    text,            -- 'stripe' | 'paypal' | 'mercadopago'
  subscription_id   text,            -- ID en el proveedor de pago
  inicio            timestamptz not null default now(),
  siguiente_cobro   timestamptz,
  created_at        timestamptz not null default now()
);

create index if not exists membresias_user_id_idx on public.membresias (user_id);
create index if not exists membresias_activa_idx  on public.membresias (activa);

-- RLS
alter table public.membresias enable row level security;

-- Usuarios solo ven y modifican sus propias membresías
create policy "membresias_all_own_user"
  on public.membresias for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ─────────────────────────────────────────────────────────────
-- TABLA: newsletter_subs
-- ─────────────────────────────────────────────────────────────
create table if not exists public.newsletter_subs (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  nombre     text,
  tag        text not null default 'newsletter-general',
  activo     boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists newsletter_subs_email_idx  on public.newsletter_subs (email);
create index if not exists newsletter_subs_activo_idx on public.newsletter_subs (activo);
create index if not exists newsletter_subs_tag_idx    on public.newsletter_subs (tag);

-- RLS
alter table public.newsletter_subs enable row level security;

-- Cualquiera puede suscribirse (INSERT público)
create policy "newsletter_insert_publico"
  on public.newsletter_subs for insert
  with check (true);

-- SELECT y UPDATE solo para service_role (proteger emails de usuarios)
create policy "newsletter_select_service_role"
  on public.newsletter_subs for select
  using (auth.role() = 'service_role');

create policy "newsletter_update_service_role"
  on public.newsletter_subs for update
  using (auth.role() = 'service_role');


-- ─────────────────────────────────────────────────────────────
-- TABLA: insignias
-- ─────────────────────────────────────────────────────────────
create table if not exists public.insignias (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  tipo        text not null,   -- 'primer-relato', 'comentarista', 'lector-nocturno', etc.
  otorgada_at timestamptz not null default now()
);

create index if not exists insignias_user_id_idx on public.insignias (user_id);

-- RLS
alter table public.insignias enable row level security;

-- Usuarios ven y reciben sus propias insignias
create policy "insignias_select_own"
  on public.insignias for select
  using (auth.uid() = user_id);

create policy "insignias_insert_own"
  on public.insignias for insert
  with check (auth.uid() = user_id);

-- service_role puede gestionar todas las insignias
create policy "insignias_all_service_role"
  on public.insignias for all
  using (auth.role() = 'service_role');


-- ─────────────────────────────────────────────────────────────
-- FIN DEL SCHEMA
-- ─────────────────────────────────────────────────────────────
