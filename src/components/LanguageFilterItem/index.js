import './index.css'

const LanguageFilterItem = props => {
  const {languageData, ativebtnId, updateActiveBtnIdAndData} = props
  const {id, language} = languageData

  const activeButtonStyling = ativebtnId === id ? 'active_button' : ''

  const onClickLanguage = () => {
    updateActiveBtnIdAndData(id)
  }

  return (
    <li>
      <button
        type="button"
        className={`filter_button ${activeButtonStyling}`}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
