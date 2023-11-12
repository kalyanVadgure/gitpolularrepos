import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConts = {
  success: 'SUCCESS',
  failure: 'FALIUER',
  inProgress: 'INPROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repositorsList: [],
    ativebtnId: languageFiltersData[0].id,
    apiStatus: apiStatusConts.success,
    activLanguage: languageFiltersData[0].language,
  }

  componentDidMount() {
    this.getPopularReposList()
  }

  getPopularReposList = async () => {
    this.setState({apiStatus: apiStatusConts.inProgress})

    const {ativebtnId, activLanguage} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activLanguage}`

    /* "name": "freeCodeCamp",
      "id": 28457823,
      "issues_count": 154,
      "forks_count": 26651,
      "stars_count": 331304,
      "avatar_url" */

    const response = await fetch(apiUrl)

    if (response.status === 200) {
      const data = await response.json()
      const fetchedPopularRepos = data.popular_repos
      const updatedPoularRepos = fetchedPopularRepos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      console.log(updatedPoularRepos)
      this.setState({
        repositorsList: updatedPoularRepos,
        apiStatus: apiStatusConts.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConts.failure})
    }
  }

  renderReposList = () => {
    const {repositorsList} = this.state

    return (
      <ul className="repos_List_items">
        {repositorsList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFaliuerView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="faliure view"
        className="faliure_view_image"
      />
    </div>
  )

  updateActiveBtnIdAndData = languageData => {
    const {id, language} = languageData
    this.setState(
      {ativebtnId: id, activLanguage: language},
      this.getPopularReposList,
    )
  }

  render() {
    const {ativebtnId, apiStatus} = this.state
    console.log(ativebtnId)
    return (
      <div className="popular_repository_app_container">
        <h1>Popular</h1>
        <ul className="language_filter_items">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              languageData={eachLanguage}
              key={eachLanguage.id}
              ativebtnId={ativebtnId}
              updateActiveBtnIdAndData={this.updateActiveBtnIdAndData}
            />
          ))}
        </ul>
        {apiStatus === apiStatusConts.success && this.renderReposList()}
        {apiStatus === apiStatusConts.inProgress && this.renderLoader()}
        {apiStatus === apiStatusConts.failure && this.renderFaliuerView()}
      </div>
    )
  }
}

export default GithubPopularRepos
