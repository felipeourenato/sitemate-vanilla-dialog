const modal = document.getElementById("modal");
const answer = document.getElementById("answer");

let actions = [];

const MODAL_TEMPLATE = `
  <div class="modal-wrapper">
    <p>{{CONTENT}}</p>
    <div class="btns">
      <button onClick="{{CONFIRMATION_CALLBACK}}">Yes</button>
      <button onClick="{{CANCEL_CALLBACK}}">Cancel</button>
    </div>
  </div>
`;

function openDialog(id, content, action) {
  actions.push({ id, action });
  modal.innerHTML = MODAL_TEMPLATE.replace("{{CONTENT}}", content)
    .replace("{{CONFIRMATION_CALLBACK}}", `handleDialogAction(${id}, true)`)
    .replace("{{CANCEL_CALLBACK}}", `handleDialogAction(${id}, false)`);
  modal.style.display = "flex";
}

function closeDialog() {
  modal.style.display = "none";
}

function handleDialogAction(id, isConfirmationAction) {
  closeDialog();
  const { action } = actions.find((act) => act.id === id);
  action(isConfirmationAction);
  actions = actions.filter((act) => act.id !== id);
}

function printDialogConfirmation(isConfirmationAction) {
  console.log(answer);
  if (isConfirmationAction) {
    answer.innerHTML = 'You just click "Yes"';
    return;
  }
  answer.innerHTML = 'You just click "Cancel"';
}
