import Header from './common/Header'
import Home from './pages/system/Home.js';
import Footer from './common/Footer';
import Register from './pages/system/Register.js';
import Login from './pages/system/Login.js';
import Layout from './components/system/Layout';
import Missing from './components/system/Missing';
import Unauthorized from './components/system/Unauthorized';
import RequireAuth from './components/system/RequireAuth';
import PersistLogin from './components/system/PersistLogin';
import { Routes, Route } from 'react-router-dom';
import ROLES from './config/Roles.js';
// Alphabet
import Alphabet from './pages/Learn/Alphabet.js';

//Vocabulary
import VocabularyList from './pages/Learn/Vocabulary/VocabularyList.js';
import VocabularyPage from './pages/Learn/Vocabulary/VocabularyPage.js';

//Forum
import HomePost from './pages/forum/HomePost.js'
import PostPage from './pages/forum/PostPage.js';
import NewPost from './pages/forum/NewPost.js';
import EditPost from './pages/forum/EditPost.js';

//Profile
import Profile from './pages/user/Profile.js';

//Grammar
import GrammarList from './pages/Learn/Grammar/GrammarList.js';
import GrammarPage from './pages/Learn/Grammar/GrammarPage.js';

//Practice
import PracticeVocabList from './pages/Practice/PracticeVocabulary/PracticeVocabList.js'
import PracticeVocabPage from './pages/Practice/PracticeVocabulary/PracticeVocabPage.js';
import PracticeGramList from './pages/Practice/PracticeGrammar/PracticeGramList.js';
import PracticeGramPage from './pages/Practice/PracticeGrammar/PracticeGramPage.js';

//Admin
import HomeAdmin from './pages/admin/HomeAdmin.js';
import VocabularyAdmin from './pages/admin/VocabularyAdmin.js';
import GrammarAdmin from './pages/admin/GrammarAdmin.js';
import PracticeGrammarAdmin from './pages/admin/PracticeGrammarAdmin.js';
import ForumAdmin from './pages/admin/ForumAdmin.js';

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />


              <Route path="/register" element={<Register />} />
              <Route path="/alphabet" element={<Alphabet />} />
              <Route path='/' element={<Home />} />

              {/* Từ vựng */}
              <Route path="/listVocabulary" element={<VocabularyList />} />
              <Route path='/listVocabulary/:id' element={<VocabularyPage />} />

              {/* Ngữ pháp */}
              <Route path="/listGrammar" element={<GrammarList />} />
              <Route path='/listGrammar/:id' element={<GrammarPage />} />

              {/*Protect these routes */}
              {/* User */}
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                {/* Diễn đàn */}
                <Route path="/homePost" element={<HomePost />} />
                <Route path='/homePost/:id' element={<PostPage />} />
                <Route path="/newPost" element={<NewPost />} />
                <Route path="/editPost/:id" element={<EditPost />} />
                {/* Thông tin cá nhân */}
                <Route path='/profile/:id' element={< Profile />} />
                {/* Ôn tập */}
                <Route path="/listPracticeVocab" element={<PracticeVocabList />} />
                <Route path="/listPracticeVocab/:userId/:exerciseId" element={<PracticeVocabPage />} />
                <Route path="/listPracticeGram" element={<PracticeGramList />} />
                <Route path="/listPracticeGram/:userId/:exerciseId" element={<PracticeGramPage />} />
              </Route>

              {/* Admin */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path='/admin' element={<HomeAdmin />} />
                <Route path='/admin/grammar' element={<GrammarAdmin />} />
                <Route path='/admin/vocabulary' element={<VocabularyAdmin />} />
                <Route path='/admin/listPracticeGrammar' element={<PracticeGrammarAdmin />} />
                <Route path='/admin/homePost' element={<ForumAdmin />} />
              </Route>

            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;