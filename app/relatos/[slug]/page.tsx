import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, MapPin, Calendar, BookOpen } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Categoria =
  | 'aparicion'
  | 'brujeria'
  | 'criatura'
  | 'paranormal'
  | 'sueno'
  | 'objeto_maldito'
  | 'ritual'
  | 'urbano'

interface Relato {
  id: string
  titulo: string
  autor_nombre: string
  ciudad: string
  categoria: Categoria
  extracto: string
  slug: string
  publicado_at: string
  es_real: boolean
  contenido: string
}

const CATEGORIA_LABELS: Record<Categoria, string> = {
  aparicion: 'Aparición',
  brujeria: 'Brujería',
  criatura: 'Criatura',
  paranormal: 'Paranormal',
  sueno: 'Sueño',
  objeto_maldito: 'Objeto Maldito',
  ritual: 'Ritual',
  urbano: 'Leyenda Urbana',
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const RELATOS: Relato[] = [
  {
    id: 'r-01',
    titulo: 'La vecina del 4B',
    autor_nombre: 'Daniela R.',
    ciudad: 'Ciudad de México',
    categoria: 'aparicion',
    extracto:
      'Llevaba tres semanas escuchando pasos arriba de mi departamento. Cuando subí a quejarme, me dijeron que ese piso estaba vacío desde 2019.',
    slug: 'la-vecina-del-4b',
    publicado_at: '2026-04-08',
    es_real: true,
    contenido: `Llevaba tres semanas escuchando pasos arriba de mi departamento. Al principio pensé que era el edificio asentándose, esas cosas que siempre te dicen para que no te alarmes. Pero los pasos tenían un ritmo, una cadencia humana. Lento, deliberado, de un extremo al otro de lo que debería ser el departamento 4B.

La primera vez que subí a quejarme, toqué la puerta durante cinco minutos completos. Nada. Bajé convencida de que el inquilino estaba dormido. La segunda vez, pregunté al conserje. Fue su respuesta lo que me heló la sangre.

"El 4B está vacío desde 2019," me dijo sin levantar la vista de su escritorio. "Hubo un accidente."

Le pedí que me explicara. Dijo que prefería no hablar de eso.

Esa noche, los pasos volvieron a las 3:17 a.m. Esta vez venían seguidos de algo nuevo: el sonido de una silla arrastrándose lentamente. Como si alguien se sentara a una mesa invisible y esperara.

Llamé a mi hermana para que viniera a quedarse conmigo. Ella no escuchó nada la primera noche. La segunda noche, me despertó a las cuatro de la madrugada. Estaba pálida.

"Hay alguien caminando arriba," me dijo.

Investigué por mi cuenta. El accidente de 2019 involucró a una mujer que vivió sola en ese departamento durante doce años. Murió sin que nadie lo notara. La encontraron semanas después.

Dicen que hay olores que indican esas cosas. Yo nunca percibí ningún olor. Solo pasos. Solo el sonido de alguien que todavía no sabe que ya no está.

Me mudé el mes siguiente. El nuevo inquilino del 4C me escribió hace dos semanas preguntando si yo también había escuchado ruidos extraños en el piso de arriba.

No supe qué responderle.`,
  },
  {
    id: 'r-02',
    titulo: 'El altar de mi abuela',
    autor_nombre: 'Marco A.',
    ciudad: 'Veracruz',
    categoria: 'brujeria',
    extracto:
      'Cuando limpiamos la casa de mi abuela después de su muerte, encontramos detrás de la pared del baño un altar con nombres escritos en sangre.',
    slug: 'el-altar-de-mi-abuela',
    publicado_at: '2026-03-30',
    es_real: true,
    contenido: `Cuando mi abuela murió a los 94 años, todos pensamos que sería un proceso normal. Limpiar la casa, repartir sus cosas, llorar un poco. Mi abuela era una mujer pequeña y callada de Veracruz que jamás levantó la voz ni en su vida.

El primer día de limpieza, mi tío notó que una de las paredes del baño sonaba hueca. Llamamos a un albañil. Cuando abrió el muro, los tres que estábamos en el cuarto dimos un paso atrás al mismo tiempo.

Detrás de la pared había una hornacina de quizás medio metro de profundidad. Dentro había velas negras consumidas hasta la base, fotografías de personas que no reconocimos, una muñeca de trapo con alfileres en los brazos y las piernas, y una lista de nombres escritos con lo que claramente era sangre seca sobre tela de manta.

Conté dieciséis nombres. Cinco los reconocí de inmediato: eran personas de la familia que habían muerto jóvenes o en circunstancias extrañas en los últimos cincuenta años.

Mi madre, que tenía ochenta años, miró la lista y se santiguó tres veces. Luego salió del baño sin decir nada y no volvió a entrar a esa casa.

Nunca nos explicó lo que sabía. Murió dos años después con ese secreto.

El albañil se negó a continuar trabajando en la casa. Nos recomendó a un señor del mercado que limpiaba espacios. Ese señor llegó, pasó diez minutos dentro y nos dijo que la pared tenía que sellarse de nuevo, que algunas cosas no se deben exponer al aire.

La sellamos. Vendimos la casa sin decirle nada a los compradores. Sé que fue un error. Pero tenía dieciséis nombres escritos con sangre y ninguna manera de explicarlos.`,
  },
  {
    id: 'r-03',
    titulo: 'El espejo de los tres golpes',
    autor_nombre: 'Sofía M.',
    ciudad: 'Monterrey',
    categoria: 'objeto_maldito',
    extracto:
      'Lo compré en un mercado de pulgas. Esa misma noche, a las 3 a.m., escuché tres golpes que venían de dentro del espejo, desde el otro lado.',
    slug: 'el-espejo-de-los-tres-golpes',
    publicado_at: '2026-03-15',
    es_real: false,
    contenido: `Era un espejo antiguo, de marco dorado con hojas talladas en la madera. Tenía pequeñas manchas oscuras en las esquinas del vidrio, de esas que parecen quemaduras viejas. El vendedor me pidió doscientos pesos y aceptó ciento cincuenta sin negociar mucho, lo que debería haberme dicho algo.

Lo puse en mi cuarto, junto a la ventana. Esa noche me quedé leyendo hasta las dos de la madrugada. Apagué la luz y tardé un poco en dormir porque el espejo captaba la luz de la calle de una manera rara, como si el reflejo tuviera más brillo que la fuente.

A las 3:04 a.m., según mi teléfono, me despertaron tres golpes.

No venían de la puerta. No venían del techo ni de las tuberías. Venían del espejo. Específicamente, parecía que venían de dentro del espejo, como si alguien golpeara el vidrio desde el otro lado.

Me quedé paralizada. Los golpes no se repitieron. No hubo nada más, solo silencio y el reflejo de mi cuarto en el espejo, idéntico al cuarto real excepto por un detalle que tardé un momento en identificar.

La silla de mi escritorio estaba en el espejo en una posición diferente a la real. En el cuarto, estaba empujada contra el escritorio. En el espejo, estaba vuelta hacia mi cama.

A la mañana siguiente, a las siete, tomé el espejo y lo dejé en la banqueta con un letrero que decía "gratis". Desapareció en veinte minutos.

Espero que quien se lo llevó duerma mejor que yo.`,
  },
  {
    id: 'r-04',
    titulo: 'La criatura del cerro',
    autor_nombre: 'Jesús V.',
    ciudad: 'Oaxaca',
    categoria: 'criatura',
    extracto:
      'Subíamos el cerro Albotres cuando vimos algo que caminaba en dos patas pero no era humano. Corrimos. Uno de nosotros nunca llegó abajo.',
    slug: 'la-criatura-del-cerro',
    publicado_at: '2026-03-02',
    es_real: true,
    contenido: `Éramos cuatro amigos. Habíamos subido el cerro Albotres decenas de veces desde niños. Es un cerro pequeño, de vegetación baja, nada que no hayan recorrido cientos de personas. Lo que vimos ese día de octubre no tenía ninguna explicación que yo sea capaz de dar.

Íbamos bajando. Eran como las cinco y media de la tarde, todavía con luz pero ya con esa luz naranja que alarga las sombras. Carlos, que iba adelante, se detuvo de golpe y nos hizo señal de quedarnos quietos.

Estaba a unos cuarenta metros, entre los arbustos. Caminaba en dos patas pero su silueta no era humana. Las proporciones estaban mal: el torso demasiado largo, los brazos llegando casi a las rodillas, la cabeza sin cuello visible, directamente sobre los hombros en un ángulo que ningún humano podría sostener. Se movía con una lentitud que parecía deliberada, como si supiera que lo observábamos y no le importara.

Los cuatro lo vimos. Los cuatro lo recordamos igual.

Corrimos. No de manera ordenada, no con un plan. Simplemente corrimos. Yo escuché detrás de mí, por un momento muy breve, algo que podría describir como el sonido de ramas quebrándose a una velocidad que no correspondía con ningún animal pequeño.

Cuando llegamos al pie del cerro, éramos tres.

Daniel no llegó.

Lo buscamos durante seis horas con linternas. Lo encontró una patrulla a las dos de la mañana, sentado en la orilla de la carretera a cuatro kilómetros del punto donde habíamos subido, mirando el pavimento. No recordaba cómo había llegado ahí. No recordaba nada de lo que había pasado después de que empezamos a correr.

Nunca volvimos a subir ese cerro. Daniel nunca nos preguntó qué fue lo que vimos.`,
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function RelatoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const relato = RELATOS.find(r => r.slug === slug)

  if (!relato) notFound()

  const fechaFormateada = new Date(relato.publicado_at).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="max-w-3xl mx-auto px-4 py-16 flex flex-col gap-10">

        {/* Back button */}
        <Link
          href="/relatos"
          className="inline-flex items-center gap-2 text-sm font-bold transition-colors self-start"
          style={{ color: 'var(--fog)', textDecoration: 'none' }}
          onMouseOver={() => {}}
        >
          <ArrowLeft size={16} />
          Volver a relatos
        </Link>

        {/* Header */}
        <header className="flex flex-col gap-4">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
              style={{ background: 'var(--blood)', color: 'var(--parchment)' }}
            >
              {CATEGORIA_LABELS[relato.categoria]}
            </span>
            <span
              className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded border"
              style={{
                borderColor: relato.es_real ? 'rgba(192,20,42,0.5)' : 'rgba(90,74,90,0.5)',
                color: relato.es_real ? 'var(--crimson)' : 'var(--muted)',
              }}
            >
              {relato.es_real ? 'Real' : 'Ficción'}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-nidex text-4xl md:text-5xl lg:text-6xl leading-tight"
            style={{ color: 'var(--parchment)' }}
          >
            {relato.titulo}
          </h1>

          {/* Meta */}
          <div
            className="flex flex-wrap items-center gap-4 pt-2 pb-4"
            style={{ borderBottom: '1px solid rgba(139,0,0,0.2)' }}
          >
            <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--fog)' }}>
              <User size={14} />
              {relato.autor_nombre}
            </span>
            <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--fog)' }}>
              <MapPin size={14} />
              {relato.ciudad}
            </span>
            <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--fog)' }}>
              <Calendar size={14} />
              {fechaFormateada}
            </span>
            <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--muted)' }}>
              <BookOpen size={14} />
              {Math.ceil(relato.contenido.split(' ').length / 200)} min de lectura
            </span>
          </div>
        </header>

        {/* Content */}
        <article>
          {relato.contenido.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              className="mb-6 text-base md:text-lg"
              style={{ color: 'var(--fog)', lineHeight: '1.8' }}
            >
              {paragraph.trim()}
            </p>
          ))}
        </article>

        {/* Back button bottom */}
        <div style={{ borderTop: '1px solid rgba(139,0,0,0.2)', paddingTop: '2rem' }}>
          <Link
            href="/relatos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all"
            style={{
              background: 'var(--dark)',
              color: 'var(--fog)',
              border: '1px solid rgba(139,0,0,0.3)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} />
            Ver más relatos
          </Link>
        </div>

      </div>
    </main>
  )
}
