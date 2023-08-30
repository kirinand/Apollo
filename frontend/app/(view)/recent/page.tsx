import EntryView from "@/components/entry-view"

type Post = {
  date: string;
  content: string
}
type Posts = Post[]

const posts: Posts = [
  {
    date: "8/23",
    content: "This is my journal"
  },
  {
    date: "8/24",
    content: "Today I went outside"
  },
]

const page = () => {

  return (
    <div>
      {posts?.length ? (
        posts.map((post) => (
          <EntryView 
            date={post.date}
            content={post.content}
          />
        ))
      ) : (
        <p>You haven't written recently...</p>
      )}
    </div>
  )
}

export default page