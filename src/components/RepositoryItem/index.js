import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, avatarUrl, forksCount, starsCount, issuesCount} = repoDetails

  return (
    <li className="repo_item">
      <img src={avatarUrl} alt="freecode" className="avatar_image" />
      <h1>{name}</h1>
      <div className="repo_info">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="start_image"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="repo_info">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="start_image"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="repo_info">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="start_image"
        />
        <p>{issuesCount} issuses</p>
      </div>
    </li>
  )
}

export default RepositoryItem
