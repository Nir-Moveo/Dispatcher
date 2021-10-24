module.exports = (plop) => {
    plop.setGenerator('feature', {
        description: 'Create a feature',
        // User input prompts provided as arguments to the template
        prompts: [
            {
                // Raw text input
                type: 'input',
                // Variable name for this input
                name: 'name',
                // Prompt to display on command line
                message: 'What is your feature name?'
            }
        ],
        actions: [
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './src/api/v1/{{kebabCase name}}/{{kebabCase name}}.router.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/router.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './src/api/v1/{{kebabCase name}}/{{kebabCase name}}.controller.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/controller.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './src/api/v1/{{kebabCase name}}/{{kebabCase name}}.handler.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/handler.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './src/api/v1/{{kebabCase name}}/{{kebabCase name}}.model.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/model.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './src/api/v1/{{kebabCase name}}/{{kebabCase name}}.schema.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/schema.ts.hbs'
            }
        ]
    });
};
