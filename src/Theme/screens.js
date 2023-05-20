import { css } from "@emotion/core";

// Device screens
export const newscreens = {
  isVerySmallPhone: (...args) => css`
    @media (max-width: 375px) {
      ${args};
    }
  `,
  isSmallPhone: (...args) => css`
    @media (max-width: 575px) {
      ${args};
    }
  `,
  isPhoneOrSmaller: (...args) => css`
    @media (max-width: 767px) {
      ${args};
    }
  `,
  isTabletOrSmaller: (...args) => css`
    @media (max-width: 991px) {
      ${args};
    }
  `,
  isTablet: (...args) => css`
    @media (min-width: 768px) and (max-width: 991px) {
      ${args};
    }
  `,
  isTabletOrLarger: (...args) => css`
    @media (min-width: 768px) {
      ${args};
    }
  `,
  isDesktop: (...args) => css`
    @media (min-width: 992px) and (max-width: 1199px) {
      ${args};
    }
  `,
  isDesktopOrLarger: (...args) => css`
    @media (min-width: 992px) {
      ${args};
    }
  `,
};

export const {
  isVerySmallPhone,
  isSmallPhone,
  isPhoneOrSmaller,
  isTablet,
  isTabletOrLarger,
  isDesktop,
  isDesktopOrLarger,
  isTabletOrSmaller,
} = newscreens;
