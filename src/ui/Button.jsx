/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type }) {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 duration-300 hover:bg-yellow-300 hover:transition-colors focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2';
  const styles = {
    primary: base + ' md:px-6 md:py-4 px-4 py-3',
    small: base + ' py-2 md:px-4 md:py-2.5 px-4 text-xs',
    secondary:
      'inline-block rounded-full border-2 text-sm border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300  hover:transition-colors hover:bg-stone-300  focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 hover:text-stone-800 focus:text-stone-800 focus:ring-offset-2 md:px-6 md:py-4 px-4 py-3',
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
