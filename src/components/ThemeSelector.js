import React from 'react';

import Select from './Select';



const ThemeSelector = ({ themes, theme, setTheme, disabled }) => {

  const getThemeOptions = () => {
    const options = themes.map((t, idx) => {
      return (
        <option key={t.id} id={idx + 1}>{t.name}</option>
      );
    });
    return (
      <>
        <option id="0">Select Theme</option>
        {options}
      </>
    );
  };

  const onThemeChange = (newThemeName) => {

    const newTheme = themes.find(theme => theme.name === newThemeName);

    setTheme(newTheme);
  };

  return (
    <Select
      name="Theme Select"
      options={getThemeOptions()}
      value={theme.name}
      onChange={(newThemeName) => onThemeChange(newThemeName)}
      disabled={disabled}
    />
  );
};

export default ThemeSelector;
