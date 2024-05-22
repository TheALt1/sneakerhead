module.exports = ({ env }) => ({
    // ...
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
    // ...
    "rest-cache": {
      config: {
        provider: {
          name: "memory",
          options: {
            max: 32767,
            maxAge: 3600,
          },
        },
        strategy: {
          contentTypes: [
            // list of Content-Types UID to cache
            "api::category.category",
            "api::order.order",
            "api::product.product",
          ],
        },
      },
    },
    email: {
      provider: 'smtp',
      providerOptions: {
        host: env('SMTP_HOST'), // SMTP server hostname
        port: env('SMTP_PORT'), // SMTP server port
        auth: {
          user: env('SMTP_USERNAME'), // SMTP username
          pass: env('SMTP_PASSWORD'), // SMTP password or API key
        },
      },
    },
    //....
  });