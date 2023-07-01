import { faker } from "@faker-js/faker";

export default function Comment({ comment }) {
    return (
        <article className="media">
            <figure className="media-left">
                <p className="image is-48x48">
                    <img src={faker.image.avatar()} />
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <p>
                        <strong>{comment.username}</strong>
                        <br />
                        {comment.body}
                        <br />
                        <small><a>Like</a> · <a>Reply</a> · {comment.updatedAt.split('T')[0]}</small>
                    </p>
                </div>

            </div>
        </article>
    );
} 