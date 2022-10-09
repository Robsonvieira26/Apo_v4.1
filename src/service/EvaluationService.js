export default class EvaluationService {


getQuestions() {
  return fetch('data/evaluationTest.json').then(res => res.json()).then(d => d.data);
  }


}