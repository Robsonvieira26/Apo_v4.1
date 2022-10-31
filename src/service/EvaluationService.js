export default class EvaluationService {


getQuestions() {
  return fetch('data/evaluation.json').then(res => res.json()).then(d => d.data);
  }


}