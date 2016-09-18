var qs = document.querySelector.bind(document);
var qsa = document.querySelectorAll.bind(document);
var createElement = document.createElement.bind(document);

var buttons = document.querySelectorAll('[data-trigger]');

function appendOverlay() {
	var overlay = createElement('div');
	overlay.className = 'overlay';
	overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background-color:rgba(125,125,125,.5)';
	if(qsa('.overlay').length === 0) {
	  document.body.appendChild(overlay);	
	} else {
		qsa('.overlay')[0].style.display = 'block';
	}
	
	return ;
}

function hideOverlay() {
	var overlay = qs('.overlay');
  if(overlay instanceof HTMLElement) {
  	overlay.style.display = 'none';
  }
}

function toggleModal(e) {
	var triggerModal = e.target.getAttribute('data-trigger');
	var targetModal = qs('#' + triggerModal);

	var onModalCloseClick = function(e) {
		if(e.target.matches('[aria-label="close"]')) {
			closeModal();
		}
	}

	var onOverlayClick = function(e) {
	  if(e.target.matches('.overlay')) {
	  	closeModal();
	  }
	}

	function closeModal() {
		targetModal.setAttribute('aria-hidden', true.toString());
		e.target.setAttribute('aria-expended', false.toString());
		targetModal.setAttribute('tabindex', '0');

		document.body.style.overflowY = 'auto';
		
		hideOverlay();
	}

	function openModal() {
		targetModal.setAttribute('aria-hidden', false.toString());
		targetModal.setAttribute('tabindex', '0');
		e.target.setAttribute('aria-expended', true.toString());

		document.body.style.overflowY = 'hidden';
		appendOverlay();
	}

	if(targetModal.getAttribute('aria-hidden') === false.toString()) {
		closeModal();
		targetModal.removeEventListener('click', onModalCloseClick, false);
		document.removeEventListener('click', onOverlayClick, false);
		
	} else if (targetModal.getAttribute('aria-hidden') === true.toString()) {
		openModal();

		targetModal.addEventListener('click', onModalCloseClick, false);
		document.addEventListener('click', onOverlayClick, false);
	}
}

[].forEach.call(buttons, function(buttonElm) {
	buttonElm.addEventListener('click', toggleModal, false);
})