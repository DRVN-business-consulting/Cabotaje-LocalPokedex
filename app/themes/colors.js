const typeColors = {
    "grass-poison": {
        bg: "#2E7D32",
        foreColor: '#1B5E20'
    },
    "fire": {
        bg: "#FF8A65",
        foreColor: '#E64A19'
    },
    "fire-flying": {
        bg: '#E64A19',
        foreColor: '#BF360C'
    },
    "water": {
        bg: '#29B6F6',
        foreColor: '#0277BD'
    },
    "bug": {
        bg: '#9CCC65',
        foreColor: '#689F38'
    },
    "bug-flying": {
        bg: '#CDDC39',
        foreColor: '#AFB42B'
    },
    "bug-poison": {
        bg: '#AFB42B',
        foreColor: '#827717'
    },
    "normal-flying": {
        bg: '#81D4FA',
        foreColor: '#29B6F6'
    },
    "normal": {
        bg: '#BDBDBD',
        foreColor: '#9E9E9E'
    },
    "poison": {
        bg: '#BA68C8',
        foreColor: '#8E24AA'
    },
    "electric": {
        bg: '#FDD835',
        foreColor: '#F9A825'
    },
    "ground": {
        bg: '#BCAAA4',
        foreColor: '#A1887F'
    },
    "poison-ground": {
        bg: '#8D6E63',
        foreColor: '#6D4C41'
    },
    "fairy": {
        bg: '#EC407A',
        foreColor: '#D81B60'
    },
    "normal-fairy": {
        bg: '#F48FB1',
        foreColor: '#EC407A'
    },
    "poison-flying": {
        bg: '#5C6BC0',
        foreColor: '#3949AB'
    },
    "bug-grass": {
        bg: '#80CBC4',
        foreColor: '#26A69A'
    },
    "fighting": {
        bg: '#9E9E9E',
        foreColor: '#757575'
    },
    "water-fighting": {
        bg: '#0277BD',
        foreColor: '#01579B'
    },
    "psychic": {
        bg: '#F50057',
        foreColor: '#C51162'
    },
    "water-poison": {
        bg: '#536DFE',
        foreColor: '#304FFE'
    },
    "rock-ground": {
        bg: '#6D4C41',
        foreColor: '#4E342E'
    },
    "water-psychic": {
        bg: '#E040FB',
        foreColor: '#D500F9'
    },
    "electric-steel": {
        bg: '#CFD8DC',
        foreColor: '#90A4AE'
    },
    "water-ice": {
        bg: '#00E5FF',
        foreColor: '#00B8D4'
    },
    "water-ice": {
        bg: '#00E5FF',
        foreColor: '#00B8D4'
    },
    "ghost-poison": {
        bg: '#7E57C2',
        foreColor: '#5E35B1'
    },
    "grass-psychic": {
        bg: '#26A69A',
        foreColor: '#00897B'
    },
    "ground-rock": {
        bg: '#4E342E',
        foreColor: '#6D4C41'
    },
    "grass": {
        bg: '#4CAF50',
        foreColor: '#388E3C'
    },

    "psychic-fairy": {
        bg: "#2E7D32",
        foreColor: '#1B5E20'
    },
    "ice-psychic": {
        bg: "#FF8A65",
        foreColor: '#E64A19'
    },
    "water-flying": {
        bg: '#E64A19',
        foreColor: '#BF360C'
    },
    "rock-water": {
        bg: '#29B6F6',
        foreColor: '#0277BD'
    },
    "rock-flying": {
        bg: '#9CCC65',
        foreColor: '#689F38'
    },
    "ice-flying": {
        bg: '#CDDC39',
        foreColor: '#AFB42B'
    },
    "electric-flying": {
        bg: '#AFB42B',
        foreColor: '#827717'
    },
    "dragon": {
        bg: '#81D4FA',
        foreColor: '#29B6F6'
    },
    "dragon-flying": {
        bg: '#BDBDBD',
        foreColor: '#9E9E9E'
    },
    "water-electric": {
        bg: '#BA68C8',
        foreColor: '#8E24AA'
    },
    "fairy-flying": {
        bg: '#FDD835',
        foreColor: '#F9A825'
    },
    "psychic-flying": {
        bg: '#BCAAA4',
        foreColor: '#A1887F'
    },
    "water-fairy": {
        bg: '#8D6E63',
        foreColor: '#6D4C41'
    },
    "rock": {
        bg: '#EC407A',
        foreColor: '#D81B60'
    },
    "grass-flying": {
        bg: '#F48FB1',
        foreColor: '#EC407A'
    },
    "water-ground": {
        bg: '#5C6BC0',
        foreColor: '#3949AB'
    },
    "dark": {
        bg: '#80CBC4',
        foreColor: '#26A69A'
    },
    "dark-flying": {
        bg: '#9E9E9E',
        foreColor: '#757575'
    },
    "ghost": {
        bg: '#0277BD',
        foreColor: '#01579B'
    },
    "normal-psychic": {
        bg: '#F50057',
        foreColor: '#C51162'
    },
    "bug-steel": {
        bg: '#536DFE',
        foreColor: '#304FFE'
    },
    "ground-flying": {
        bg: '#6D4C41',
        foreColor: '#4E342E'
    },
    "steel-ground": {
        bg: '#E040FB',
        foreColor: '#D500F9'
    },
    "bug-rock": {
        bg: '#CFD8DC',
        foreColor: '#90A4AE'
    },
    "bug-fighting": {
        bg: '#00E5FF',
        foreColor: '#00B8D4'
    },
    "dark-ice": {
        bg: '#00E5FF',
        foreColor: '#00B8D4'
    },
    "fire-rock": {
        bg: '#7E57C2',
        foreColor: '#5E35B1'
    },
    "ice-ground": {
        bg: '#26A69A',
        foreColor: '#00897B'
    },
    "water-rock": {
        bg: '#4E342E',
        foreColor: '#6D4C41'
    },
    "steel-flying": {
        bg: '#4CAF50',
        foreColor: '#388E3C'
    },
    others: {
        bg: '#F44336',
        foreColor: '#B71C1C'
    }
}

const colors = {
    red_500: '#F44336',
    gray_200: '#EEEEEE',
    white: '#FFFFFF',
    error: '#B71C1C'
}

const themeColors = {
    light: {
        container: "#E0E0E0",
        textColor: '#000000',
        foreColor: '#616161'
    }, 
    dark: {
        container: '#3C3D37',
        textColor: colors.white,
        foreColor: '#9E9E9E'
    },
}


export {
    colors,
    typeColors,
    themeColors
}