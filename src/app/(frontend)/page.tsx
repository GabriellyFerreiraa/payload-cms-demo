import { getPayload } from 'payload'
import config from '@payload-config'
import './styles.css'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 10,
  })

  return (
    <main className="wrap">
      <p className="eyebrow">Payload CMS · Next.js App Router · Postgres</p>
      <h1>Content your team edits, without touching the code.</h1>
      <p className="lede">
        Every post below is a database record, written in the Payload admin panel and read
        server-side by a React Server Component. Each one shows the fields behind it, because
        the point of a CMS is that the structure is visible and editable, not buried in markup.
      </p>

      {posts.length === 0 ? (
        <p className="empty">
          No published posts yet. Create one in the admin panel and set its status to Published.
        </p>
      ) : (
        posts.map((post) => (
          <article className="post" key={post.id}>
            <div>
              <h2>{post.title}</h2>
              <p>Rendered on the server. No client-side fetch, no exposed credentials.</p>
            </div>
            <div className="meta">
              <div><span>collection</span><span>posts</span></div>
              <div><span>slug</span><span>/{post.slug}</span></div>
              <div>
                <span>status</span>
                <span><em className="badge">{post.status}</em></span>
              </div>
              <div>
                <span>published</span>
                <span>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toISOString().slice(0, 10)
                    : '—'}
                </span>
              </div>
            </div>
          </article>
        ))
      )}

      <p className="foot">
        Admin panel at <a href="/admin">/admin</a> · Data on Neon Postgres · Deployed on Vercel
      </p>
    </main>
  )
}