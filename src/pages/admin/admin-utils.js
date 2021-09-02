export const getInitials = (user) => user.fullname.split(' ').map(u => u[0]);
