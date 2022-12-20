import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function VacanciesNavBar() {
    const location = useLocation();

    return (
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
                <NavLink
                    to='/vacancies'
                    className={`${location.pathname === '/vacancies' ? 'nav-link-active' : 'nav-link'} nav-link-vertical`}
                >
                    <span style={{ fontWeight: 'bold' }}>Все</span>
                </NavLink>
                <NavLink
                    to='/vacancies/department'
                    className={data => `${data.isActive ? 'nav-link-active' : 'nav-link'} nav-link-vertical`}
                >
                    <span style={{ fontWeight: 'bold' }}>Департамента</span>
                </NavLink>
            </nav>
    );
}

export default VacanciesNavBar;