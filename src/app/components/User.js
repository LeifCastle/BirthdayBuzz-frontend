
export default function User({ user }) {

    return (
        <tr>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.jobTitle}</td>
        </tr>
    )
}