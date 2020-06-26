export default {
  openapi: "3.0.0",
  info: {
    title: "Cashback boticario",
    description: "Api system cashback",
    version: "0.0.1",
    contact: {
      name: "Suport",
      email: "brunoti.ads@gmail.com"
    }
  },
  servers: [
    {
      url: "http://localhost:8181/v1"
    }
  ],
  tags: [
    {
      name: "login",
      description: "Login api"
    },
    {
      name: "user",
      description: "User api"
    },
    {
      name: "purchase",
      description: "Purchase api"
    }
  ],
  paths: {
    "/public/login": {
      post: {
        tags: ["login"],
        summary: "Return the token access",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                $ref: "#/components/schemas/loginSchema"
              }
            },
            "application/json": {
              schema: {
                $ref: "#/components/schemas/loginSchema"
              }
            }
          }
        },
        example: {
          email: "brunoti.ads@gmai.com",
          password: "12345"
        },
        responses: {
          "200": {
            description: "Success"
          }
        }
      }
    },

    "/user/{userId}": {
      get: {
        tags: ["user"],
        summary: "Single row or null",
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              type: "integer",
              description: "Id of user",
              format: "int64"
            }
          }
        ],
        responses: {
          "200": {
            description: "Success"
          }
        }
      },
      put: {
        tags: ["user"],
        summary: "Update row",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                $ref: "#/components/schemas/userSchema"
              }
            },
            "application/json": {
              schema: {
                $ref: "#/components/schemas/userSchema"
              }
            }
          }
        },
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: {
              type: "integer",
              description: "Id of user",
              format: "int64"
            }
          }
        ],
        responses: {
          "200": {
            description: "Success"
          }
        }
      }
    },
    "/user": {
      post: {
        tags: ["user"],
        summary: "Create  new user",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                $ref: "#/components/schemas/userSchemaRequired"
              }
            },
            "application/json": {
              schema: {
                $ref: "#/components/schemas/userSchemaRequired"
              }
            }
          }
        },
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        parameters: [],
        responses: {
          "200": {
            description: "Success"
          }
        }
      }
    },

    "/purchase": {
      post: {
        tags: ["purchase"],
        summary: "Create new purchase",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                $ref: "#/components/schemas/purchaseSchemaRequired"
              }
            },
            "application/json": {
              schema: {
                $ref: "#/components/schemas/purchaseSchemaRequired"
              }
            }
          }
        },
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        parameters: [],
        responses: {
          "200": {
            description: "Success"
          }
        }
      },
      get: {
        tags: ["purchase"],
        parameters: [
          {
            in: "query",
            name: "limit",
            required: true,
            schema: {
              type: "integer",
              description: "limit",
              format: "int64"
            }
          },
          {
            in: "query",
            name: "offset",
            required: true,
            schema: {
              type: "integer",
              description: "offset",
              format: "int64"
            }
          }
        ],
        summary: "Find my purchases",
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        responses: {
          "200": {
            description: "Success"
          }
        }
      }
    },
    "/purchase/{purchaseId}": {
      get: {
        tags: ["purchase"],
        parameters: [
          {
            in: "path",
            name: "purchaseId",
            required: true,
            schema: {
              type: "integer",
              description: "purchaseId",
              format: "int64"
            }
          }
        ],
        summary: "Find by id",
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        responses: {
          "200": {
            description: "Success"
          }
        }
      }
    },
    "/purchase/cashback-external": {
      get: {
        tags: ["purchase"],
        summary: "Find cashback external API",
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        responses: {
          "200": {
            description: "Success"
          }
        }
      }
    }
  },

  components: {
    securitySchemes: {
      ApiKeyAuth: {
        in: "header",
        type: "apiKey",
        name: "Authorization"
      }
    },
    schemas: {
      loginSchema: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email"
          },
          password: {
            type: "string"
          }
        },
        required: ["email", "password"],
        example: {
          email: "brunoti.ads@gmail.com",
          password: "12345"
        }
      },
      userSchema: {
        type: "object",
        properties: {
          name: {
            type: "string"
          },
          email: {
            type: "integer",
            format: "email"
          },
          password: {
            type: "string",
            format: "password"
          },
          document: {
            type: "string"
          }
        },
        example: {
          name: "Joao Silva",
          email: "jsilva@gmail.com",
          password: "12345",
          document: "04484698048"
        }
      },
      userSchemaRequired: {
        allOf: [
          {
            $ref: "#/components/schemas/userSchema"
          }
        ],
        properties: {},
        required: ["name", "email", "password", "document"]
      },
      purchaseSchema: {
        type: "object",
        properties: {
          itens: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "integer"
                },
                quantity: {
                  type: "integer"
                }
              }
            }
          }
        },
        example: {
          itens: [
            { id: 1, quantity: 2 },
            { id: 3, quantity: 10 },
            { id: 4, quantity: 2 }
          ]
        }
      },
      purchaseSchemaRequired: {
        allOf: [
          {
            $ref: "#/components/schemas/purchaseSchema"
          }
        ],
        properties: {},
        required: ["userId", "date", "itens"]
      }
    }
  }
}
