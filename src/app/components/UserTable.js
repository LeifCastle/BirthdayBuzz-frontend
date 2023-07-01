import User from './User';

export default function UserTable({ users }) {
    const rows = [];

    users.forEach((user) => {
        // each user and push them inside the array with the User component (have not made)
        rows.push(
            <User 
                user={user}
                key={user._id} />
        )
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Job Title</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}