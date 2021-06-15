const useAuth = {
    signOut: (cb) => {
        localStorage.clear();
        cb();
    }
}

export default useAuth