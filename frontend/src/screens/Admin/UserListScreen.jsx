import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserListScreen = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th className="text-center">ADMIN</th>
              <th className="text-center">BRAND</th> {/* ✅ New BRAND Column */}
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td className="text-center">
                  {user.isAdmin ? '✅' : '❌'}
                </td>
                <td className="text-center">
                  {user.isBrand ? '✅' : '❌'} {/* ✅ Show Brand status */}
                </td>
                <td className="d-flex align-items-center justify-content-center gap-2">
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this user?')) {
                        console.log('Delete user:', user._id);
                      }
                    }}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
