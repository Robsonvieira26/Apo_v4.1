export default class LinkertService {
  getTypes() {
    return fetch("data/linkertTypes.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
