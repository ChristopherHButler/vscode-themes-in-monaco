import React, { useState } from 'react';

import Select from './Select';
import { Themes } from '../constants';

const ThemeSelector = ({ theme, setTheme, disabled }) => {

  const themeOptions = (
    <>
      <option id="0">Select Theme</option>
      <option id="1">{Themes.DARK_PLUS.display}</option>
      <option id="2">{Themes.LIGHT_PLUS.display}</option>
    </>
  );

  const onThemeChange = (newThemeName) => {

    switch (newThemeName) {
      case Themes.DARK_PLUS.display:
        setTheme({ id: Themes.DARK_PLUS.value, name: Themes.DARK_PLUS.display });
        return;
      case Themes.LIGHT_PLUS.display:
        setTheme({ id: Themes.LIGHT_PLUS.value, name: Themes.LIGHT_PLUS.display });
        return;
    }
  };

  return (
    <Select
      name="Theme Select"
      options={themeOptions}
      value={theme.name}
      onChange={(newThemeName) => onThemeChange(newThemeName)}
      disabled={disabled}
    />
  );
};

export default ThemeSelector;
