import { forwardRef } from 'react';
import { NavLink as BaseNavLink, NavLinkProps as BaseNavLinkProps } from 'react-router-dom';

type NavLinkProps = BaseNavLinkProps & {
  activeClassName?: string;
  activeStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ activeClassName, activeStyle, ...props }, ref) => {
  activeClassName ??= 'on';
  return (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) => [props.className, isActive ? activeClassName : null].filter(Boolean).join(' ')}
      style={({ isActive }) => ({
        ...props.style,
        ...(isActive ? activeStyle : null)
      })}
    />
  );
});
NavLink.displayName = 'Navlink';

export default NavLink;
