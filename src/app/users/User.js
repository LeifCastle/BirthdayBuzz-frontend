
export default function User({ user }) {

    return (
        <tr>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.jobTitle}</td>
            <td>{user.email}</td>
        </tr>
    )
}