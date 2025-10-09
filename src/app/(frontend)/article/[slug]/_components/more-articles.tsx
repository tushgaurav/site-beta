const recommendedArticles = [
  {
    title: 'How to build a 3D printer',
    excerpt: 'This is a short excerpt of the article',
    slug: 'how-to-build-a-3d-printer',
  },
  {
    title: 'A Practical Guide to get Laid',
    excerpt: 'This is a short excerpt of the article about getting laid and getting some pussy',
    slug: 'a-practical-guide-to-get-laid',
  },
]

export default function MoreArticles() {
  return (
    <div>
      <h4 className="uppercase text-sm text-muted-foreground font-semibold mb-4">More Articles</h4>
      <div className="flex flex-col gap-4">
        {recommendedArticles.map((article) => (
          <div key={article.slug}>
            <h5 className="text-sm font-semibold">{article.title}</h5>
            <p className="text-sm text-muted-foreground">{article.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
