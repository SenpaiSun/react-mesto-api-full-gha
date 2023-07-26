import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { api } from '../utils/api'
import Login from './Login'
import Register from './Register'
import PageNotFound from './PageNotFound'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { AppContext } from '../contexts/AppContext'
import ProtectedRoute from './ProtectedRoute'
import { userRegister, userLogin, userToken } from '../utils/auth'

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isEditRegisterPopupOpen, setEditRegisterPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [email, setEmail] = React.useState('')
  const [cards, setCards] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isEditRegisterPopupOpen
  const [isStateTooltip, setStateTooltip] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getDefaultCards()])
        .then(([user, cards]) => {
          setCurrentUser(user)
          const reversedCards = cards.slice().reverse();
          setCards(reversedCards);
          setStateTooltip(true)
        })
        .catch(console.error)
    }
  }, [loggedIn])

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      userToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.email)
            setLoggedIn(true)
            navigate('/', { replace: true })
          }
        })
        .catch(console.error)
    } else {
      navigate('/sign-up', { replace: true })
    }
  }, [])

  function removeToken() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
    }
    setLoggedIn(false)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setEditRegisterPopupOpen(false)
    setSelectedCard(null)
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape)
      return () => {
        document.removeEventListener('keydown', closeByEscape)
      }
    }
  }, [isOpen])

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id)
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((cards) => (cards._id === card._id ? newCard : cards)))
      })
      .catch(console.error)
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId))
      })
      .catch(console.error)
  }

  function handleUpdateUser(data) {
    setIsLoading(true)
    api
      .updateUserProfile(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api
      .changeAvatar(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api
      .createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      })
  }

  function infoTooltipAprove() {
    setEditRegisterPopupOpen(true)
    setStateTooltip(true)
  }

  function infoTooltipCancel() {
    setEditRegisterPopupOpen(true)
    setStateTooltip(false)
  }

  function handleUserRegister(email, password) {
    userRegister(email, password)
      .then((res) => {
        if (res) {
          infoTooltipAprove()
        }
      })
      .catch((error) => {
        infoTooltipCancel()
        console.log(error)
      })
  }

  function setTokenAndHeaders(token) {
    const headers = {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    api.setHeaders(headers);
  }

  async function handleUserLogin(email, password) {
    try {
      const res = await userLogin(email, password);
      if (res.token || isStateTooltip) {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        setEmail(email);
        await setCurrentUser(res.user);
        setTokenAndHeaders(res.token);
        navigate('/', { replace: true });
      } else {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/sign-in', { replace: true });
      }
    } catch (error) {
      localStorage.removeItem('token');
      setLoggedIn(false);
      navigate('/sign-in', { replace: true });
      console.log(error);
    }
  }

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups, isOpen }}>
      <div className='root'>
        <Routes>
          <Route
            path='/'
            element={
              currentUser && (
                <>
                  <Header titleHeader={'Выйти'} redirect={'sign-in'} email={loggedIn ? email : ''} onClick={removeToken} />
                  <CurrentUserContext.Provider value={currentUser}>
                    <ProtectedRoute
                      component={Main}
                      currentUser={currentUser}
                      isLoggedIn={loggedIn}
                      onCards={cards}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                    />
                  </CurrentUserContext.Provider>
                  <Footer />
                </>
              )
            }
          />
          <Route
            path='/sign-up'
            element={
              <Register
                titleHeader={'Вход'}
                redirect='/sign-in'
                onClose={closeAllPopups}
                isOpen={isEditRegisterPopupOpen ? 'popup__opened' : ''}
                onRegister={handleUserRegister}
                onImageTooltip={isStateTooltip}
                text={isStateTooltip ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
              />
            }
          />
          <Route
            path='/sign-in'
            element={
              <Login
                titleHeader={'Регистрация'}
                redirect='/sign-up'
                onLogin={handleUserLogin}
                onImageTooltip={isStateTooltip}
                isOpen={isEditRegisterPopupOpen ? 'popup__opened' : ''}
                onClose={closeAllPopups}
                text={isStateTooltip ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
              />
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <CurrentUserContext.Provider value={currentUser}>
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
        <AddPlacePopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen ? 'popup__opened' : ''} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm onClose={closeAllPopups} name='delete_card' title='Вы уверены?' buttonText='Да' />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onChangeAvatar={handleUpdateAvatar} />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </AppContext.Provider>
  )
}

export default App
