import { html, fixture, expect } from '@open-wc/testing';
import "../play-list-2.js";

describe("PlayList2 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <play-list-2
        title="title"
      ></play-list-2>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
