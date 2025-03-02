const CommitList = ({ commits }) => {
    return (
      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Recent Commits</h3>
        <ul>
          {commits.map((commit, index) => (
            <li key={index} className="border-b py-2">
              <span className="text-blue-500">{commit.repoName}</span>: {commit.message}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CommitList;
  