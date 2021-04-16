// const Link = require('next/link')
import Link from 'next/link';
import React from 'react';
import { veriftToken, getDecode } from '../middleware/auth.middleware';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface Theme {
    theme: () => string;
}

class Navbar extends React.Component<Theme, { token: string, }> {
    auth:any
    constructor(props) {
        super(props);
        this.state = {
            token: cookies.get('user') || null,
        };
        this.auth = getDecode(cookies.get('user') || null);
    }

    render() {
        return (
            <nav className='navbar'>
                <div className={'main'}>
                    <div className={'logo'}>
                        <Link href='/'>
                            <a>WALLSS</a>
                        </Link>
                    </div>
                    <div className={'search'}>
                        <form action='' method='get'>
                            <input type='text' className='searchinput inputColor' placeholder='Search..' />
                        </form>
                    </div>
                    <div className='rightMenu'>
                        <div className={''}>
                            <span onClick={() => this.props.theme()} className='dark-btn-moon'>
                                <i className='fas fa-moon'></i>
                            </span>
                        </div>
                        <div className={''}>
                            <Link href='/upload'>
                                <a className='main-btn'>
                                    <i className='fas fa-upload'></i> Upload
                                </a>
                            </Link>
                        </div>
                        <div className={'createAccount'}>
                            {this.auth == null ? (
                                <Link href='/auth/register'>
                                    <a className='dark-btn'>Create Account</a>
                                </Link>
                            ) : (
                                <div className='dropdown pointer'>
                                    <div className='dark-btn'>
                                        {this.auth.name.charAt(0).toUpperCase() + this.auth.name.slice(1)}
                                    </div>
                                    <div className='dropdown-content'>
                                        <Link href='/'>
                                            <a>Edit account</a>
                                        </Link>
                                        <Link href='/'>
                                            <a>My favorites</a>
                                        </Link>
                                        <Link href='/auth/logout'>
                                            <a>Logout</a>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
