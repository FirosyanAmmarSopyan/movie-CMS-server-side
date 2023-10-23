const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

// beforeAll(async () => {
//     await sequelize.queryInterface.bulkInsert("Customers",
//     [
//         {
//           email: "admin@admin.com",
//           password: "admin123",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//         {
//           email: "admin1@admin.com",
//           password: "admin123",
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         },
//       ]
//     , {});
// });

// afterAll(async () => {
//     // seteelah semua unit test dijalankan
//     // BERSIH2 db
//     await sequelize.queryInterface.bulkDelete("Customers", null, {
//       restartIdentity: true,
//       cascade: true,
//       truncate: true,
//     });
//   });

// describe("POST /customer/register", () => {
//     // if success register
//   test("should create account for customer and return status 201", async () => {
//     const reqBodyData = {
//                 email: "admin11@mail.com",
//                 password: "admin123",
//               };

//     const respond = await request(app)
//       .post("/customer/register")
//       .send(reqBodyData);
//     expect(respond.status).toBe(201);
//     expect(respond.body).toBeInstanceOf(Object);
//     expect(respond.body).toHaveProperty("email", reqBodyData.email);
//     expect(respond.body).toHaveProperty("role", respond.body.role);
//     expect(respond.body).toHaveProperty("id", expect.any(Number));
//   });

//   // if email  empty
//   it('should  fail because send empty email', async () => {
//     const reqBodyData = {
//         email: "",
//         password: "admin123",
//       };

//     const respond = await request(app)
//     .post("/customer/register")
//     .send(reqBodyData);

//     // console.log(respond.body , '<<<<<<');
//     expect(respond.status).toBe(400);
//     expect(respond.body).toBeInstanceOf(Object);
//     expect(respond.body).toHaveProperty("error", "email required");
//   });

// // //   //if fail not send email
//   it('should  fail because not send body email', async () => {
//     const reqBodyData = {
//         password : 'admin123'
//       };

//     const respond = await request(app)
//     .post("/customer/register")
//     .send(reqBodyData);
//     expect(respond.status).toBe(400);
//     expect(respond.body).toBeInstanceOf(Object);
//     expect(respond.body).toHaveProperty("error", "email required");
//   });

// // //   // if password  empty
//   it('should  fail because send empty password', async () => {
//     const reqBodyData = {
//         email: "admin2@admin.com",
//         password: "",
//       };

//     const respond = await request(app)
//     .post("/customer/register")
//     .send(reqBodyData);
//     expect(respond.status).toBe(400);
//     expect(respond.body).toBeInstanceOf(Object);
//     expect(respond.body).toHaveProperty("error", "password required");
//   });

//   //if not send password
//   it('should  fail because not send password', async () => {
//     const reqBodyData = {
//         email: "admin2@admin.com",
//       };

//     const respond = await request(app)
//     .post("/customer/register")
//     .send(reqBodyData);
//     expect(respond.status).toBe(400);
//     expect(respond.body).toBeInstanceOf(Object);
//     expect(respond.body).toHaveProperty("error", "password required");
//   });

// // //   //if fail email already exist
//   it('should  fail because email already use', async () => {
//     const reqBodyData = {
//         email : 'admin@admin.com',
//         password : 'admin123'
//       };

//     const respond = await request(app)
//     .post("/customer/register")
//     .send(reqBodyData);
//     expect(respond.status).toBe(400);
//     expect(respond.body).toBeInstanceOf(Object);
//     expect(respond.body).toHaveProperty("error", "email must be unique");
//   });
//    //   //if fail email invalid format exist
//    it('should  fail because format not email', async () => {
//     const reqBodyData = {
//         email : 'adminadmin.com',
//         password : 'admin123'
//       };

//     const respond = await request(app)
//     .post("/customer/register")
//     .send(reqBodyData);
//     expect(respond.status).toBe(400);
//     expect(respond.body).toBeInstanceOf(Object);
//     expect(respond.body).toHaveProperty("error", "format must be email");
//   });

// });

describe("POST /customer/login", () => {
  // if success login
  test("should success login return status 200 and return access_token", async () => {
    const reqBodyData = {
      email: "admin@admin.com",
      password: "admin123",
    };

    const respond = await request(app)
      .post("/customer/login")
      .send(reqBodyData);

    console.log(respond);
    expect(respond.status).toBe(200);
    expect(respond.body).toBeInstanceOf(Object);
    console.log(respond.body);
    // expect(respond.body).toHaveProperty("access_token", reqBodyData.access_token);
  });
  // if password login wrong
  test("should fail login becuase email or password wrong", async () => {
    const reqBodyData = {
      email: "admin@admin.com",
      password: "admin111",
    };

    const respond = await request(app)
      .post("/customer/login")
      .send(reqBodyData);

    console.log(respond);
    expect(respond.status).toBe(200);
    expect(respond.body).toBeInstanceOf(Object);
    expect(respond.body).toHaveProperty("error", "error invalid email or password");
    console.log(respond.body);
  });

  // if email login not exists
  test("should fail login becuase email not exists", async () => {
    const reqBodyData = {
      email: "admin@admin.com",
      password: "admin123",
    };

    const respond = await request(app)
      .post("/customer/login")
      .send(reqBodyData);

    console.log(respond);
    expect(respond.status).toBe(200);
    expect(respond.body).toBeInstanceOf(Object);
    expect(respond.body).toHaveProperty("error", "error invalid email or password");
    console.log(respond.body);
  });
});
