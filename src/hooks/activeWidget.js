const WIDGETS = {
    clientes: 'hola',
};

export const useActiveWidget = (activeRoute) => {
    const Widget = WIDGETS[activeRoute];

    return Widget ? Widget : null;
};
