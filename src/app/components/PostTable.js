import Post from './Post';

export default function PostTable({ posts }) {
    const rows = [];

    posts.forEach((post) => {
        // each post and push them inside the array with the User component (have not made)
        rows.push(
            <Post 
                post={post}
                key={post._id} />
        )
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Content</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}