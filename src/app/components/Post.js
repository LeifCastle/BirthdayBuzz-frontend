import Comment from "./Comment";
import { faker } from "@faker-js/faker";

export default function Post({ post }) {
    const rows = [];
    if (post.comments.length) {
        post.comments.forEach((comment) => {
            rows.push(
                <Comment 
                    comment={comment}
                    key={comment._id}/>
            );
        })
    }
    return (
        <>
            <article className="media">
                <figure className="media-left">
                    <p className="image is-64x64">
                        <img src={faker.image.avatar()} />
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{post.username}</strong>
                            <br />
                            {post.content}
                            <br />
                            <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
                        </p>
                    </div>
                     {/* import the comment component */}
                     {rows}
                </div>
            </article>

           

            <article className="media">
                <figure className="media-left">
                    <p className="image is-64x64">
                        <img src={faker.image.avatar()} />
                    </p>
                </figure>
                <div className="media-content">
                    <div className="field">
                        <p className="control">
                            <textarea className="textarea" placeholder="Add a comment..."></textarea>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <button className="button">Post comment</button>
                        </p>
                    </div>
                </div>
            </article>
        </>
    );
}