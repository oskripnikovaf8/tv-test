module.exports = {
    plugins: {
        autoprefixer: { grid: 'true' },
        'postcss-preset-env': {
            stage: 0,
        },
        'postcss-normalize': {},
        'postcss-flexbugs-fixes': {},
        'postcss-object-fit-images': {},
        'postcss-inline-svg': {},
        'postcss-media-minmax': {},
        cssnano: {
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true,
                    },
                    calc: false,
                },
            ],
        },
    },
};
