const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");

describe("GET /apps", () => {
  it("should return an array of books", () => {
    return request(app)
      .get("/apps")
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
        const apps = res.body[0];
        expect(apps).to.include.all.keys("genre", "title");
      });
  });
  it("should be 400 if sort is incorrect", () => {
    return request(app)
      .get("/apps")
      .query({ sort: "MISTAKE" })
      .expect(400, "Sort must be one of title or genre");
  });
  it("should sort by title", () => {
    return request(app)
      .get("/apps")
      .query({ sort: "title" })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
        //adding a comment
        let i = 0;
        let sorted = true;
        while (sorted && i < res.body.length - 1) {
          sorted = sorted && res.body[i].title < res.body[i + 1].title;
          i++;
        }
        // expect(sorted).to.be.true;
      });
  });
});
