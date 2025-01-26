
import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Header = () => {
  const { t } = useTranslation();
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const [lang, setLang] = useState("en");

  const languages = [
    { value: "en", text: t('English') },
    { value: "am", text: t('ኣማርኛ') },
    { value: "ti", text: t('ትግርኛ') },
  ];

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang); 
  };

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input
            type='text'
            placeholder={t("searchPlaceholder")}
            className='w-full outline-none'
            onChange={handleSearch}
            value={search}
          />
          <div className='text-lg min-w-[50px] h-8 bg-purple-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>
          <div className='relative flex justify-center'>
            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev =>!prev)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                </div>
              )
            }
            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>
                          {t("adminPanel")}
                        </Link>
                      )
                             }
                              <Link to={"/account-management"} className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>
                        {t("accountManagement")}
                       </Link>
                  </nav>
                </div>
              )
            }
          </div>

          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl relative'>
                <span><FaShoppingCart /></span>
                <div className='bg-purple-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProductCount}</p>
                </div>
              </Link>
            )
          }

<select value={lang} onChange={handleChange}>
            {languages.map((item) => (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            ))}
          </select>
          
          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-purple-600 hover:bg-purple-700'>
                  {t("logout")}
                </button>
              ) : (
                <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-purple-600 hover:bg-purple-700'>
                  {t("login")}
                </Link>
              )
            }
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
