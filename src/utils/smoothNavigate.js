export const smoothNavigate = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const useSmoothNavigate = (navigate) => {
  return {
    navigateTo: smoothNavigate,
    smoothGoBack: () => {
      window.history.back();
    },
    smoothNavigate: smoothNavigate,
  };
};
