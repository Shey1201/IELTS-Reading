export function modifyIframeContent(win, isSingleArticle = false) {
  if (!win || !win.document) return;

  const doc = win.document;

  const style = doc.createElement('style');
  style.textContent = `
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.8 !important; background:#F5F7F9; }
    p { margin-bottom: 1.5em; font-size: 18px !important; }
    .question, .option { font-size: 16px !important; }
    #timer, .timer { display: none !important; }
    input[type="radio"], input[type="checkbox"] {
      vertical-align: middle;
      margin-right: 6px;
      margin-top: -1px;
    }
    input[type="text"] {
      display: inline-block;
      min-width: 80px;
      max-width: 220px;
      width: auto !important;
    }
    /* Force single choice options to new lines by default */
    .group label, .question label {
      display: flex !important;
      margin: 8px 0 !important;
    }
    /* Horizontal layout for short options (A-G, T/F/NG) */
    .inline-options-container .group label, 
    .inline-options-container .question label,
    .group.inline-options-container label,
    .question.inline-options-container label,
    li.inline-options-container label {
      display: inline-flex !important;
      margin-right: 20px !important;
      margin-bottom: 0 !important;
      margin-top: 0 !important;
      width: auto !important;
    }
    /* Exception for table cells to keep labels inline if used */
    td label {
      display: inline-flex !important;
      margin-right: 12px !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
    label {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
      margin-right: 12px;
    }
    #left p {
      line-height: 1.8 !important;
    }
    #left h2:first-of-type,
    #left p:first-of-type {
      display: none !important;
    }
    table, th, td {
      border-color: #f0f0f0 !important;
    }
    th, td {
      border-left: none !important;
      border-right: none !important;
    }
    .shell {
      background: #F5F7F9;
    }
    #left {
      background: #F5F7F9;
    }
    #right {
      background: #ffffff;
    }
    .bottom-bar { display: none !important; }
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #999; }

    /* Hide original list markers for UL only */
    ul { list-style: none !important; padding-left: 0 !important; }
    ul li { list-style: none !important; }
    /* Keep OL markers but do not override their type (e.g. i, ii, iii) */
    ol { padding-left: 20px !important; }
  `;
  doc.head.appendChild(style);

  const inlineScript = doc.createElement('script');
  inlineScript.textContent = `
    (function () {
      if (window.__ieltsInlineReviewHooked) return;
      window.__ieltsInlineReviewHooked = true;
      
      // Inject generic answer extractor for parent
      window.extractUserAnswers = function() {
          var data = {};
          // Inputs
          document.querySelectorAll('input').forEach(function(inp) {
              if ((inp.type === 'radio' || inp.type === 'checkbox') && inp.checked) {
                  data[inp.name] = inp.value;
              } else if (inp.type === 'text' && inp.value.trim()) {
                  data[inp.name] = inp.value.trim();
              }
          });
          // Dropzones
          document.querySelectorAll('.summary-dropzone, .match-dropzone').forEach(function(z) {
             if (z.textContent && z.textContent.trim() && z.textContent !== z.dataset.q) {
                 data[z.dataset.q] = z.textContent.trim();
             }
          });
          return data;
      };
      var correctBg = "#F6FFED";
      var correctColor = "#52C41A";
      var wrongBg = "#FFF1F0";
      var wrongColor = "#F5222D";
      var visibleQuestionIds = [];

      try {
        if (typeof answerKey !== "undefined" && typeof answerKey === "object") {
          window.answerKey = answerKey;
        }
      } catch (e) {}

      try {
        if (typeof PAPER_ID !== "undefined") {
          window.PAPER_ID = PAPER_ID;
        }
      } catch (e) {}

      function notifyParent(type, payload) {
        window.parent.postMessage({ type: 'IELTS_TEST_UPDATE', subType: type, payload: payload }, '*');
      }

      function normalizeText(s) {
        return String(s == null ? '').toLowerCase().replace(/\\s+/g, ' ').trim();
      }

      // Listen for messages from parent
      window.addEventListener('message', function(e) {
          if (!e.data || e.data.type !== 'IELTS_PARENT_ACTION') return;
          if (e.data.subType === 'SCROLL_TO_QUESTION') {
              var qid = e.data.payload;
              var target =
                  document.querySelector('input[name="' + qid + '"]') ||
                  document.querySelector('input[name^="' + qid + '"]') ||
                  document.getElementById(qid) ||
                  document.querySelector('input[id^="' + qid + '"]') ||
                  document.querySelector('.summary-input[data-q="' + qid + '"]');
              if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  var container = target.closest('tr') || target.closest('div.question') || target.closest('.question-block') || target.parentElement;
                  if (container) {
                      var originalBg = container.style.backgroundColor;
                      container.style.transition = 'background-color 0.5s';
                      container.style.backgroundColor = '#fff7ed';
                      setTimeout(function() {
                          container.style.backgroundColor = originalBg;
                      }, 1000);
                  }
              }
          } else if (e.data.subType === 'SET_VIEW_MODE') {
              var mode = e.data.payload;
              var rightPane = document.getElementById('right');
              var leftPane = document.getElementById('left');
              if (!rightPane || !leftPane) return;
              if (mode === 'sheet') {
                  rightPane.style.display = 'none';
                  leftPane.style.flex = '1 1 auto';
              } else {
                  rightPane.style.display = '';
                  leftPane.style.flex = '';
              }
          } else if (e.data.subType === 'RESET_ALL') {
              resetAllInputs();
          }
      });

      function resetAllInputs() {
          document.querySelectorAll('input').forEach(function(inp) {
              if (inp.type === 'radio' || inp.type === 'checkbox') {
                  inp.checked = false;
                  inp.style.accentColor = '';
                  inp.style.boxShadow = '';
              }
              if (inp.type === 'text') {
                  inp.value = '';
                  inp.removeAttribute('data-user-answer');
                  inp.style.color = '';
                  inp.style.border = '';
                  inp.style.borderBottom = '';
                  inp.style.textDecoration = '';
                  inp.style.background = '';
                  inp.style.outline = '';
                  inp.style.fontWeight = '';
                  inp.style.padding = '';
              }
          });
          document.querySelectorAll('.q-mark').forEach(function(m) { m.remove(); });
          document.querySelectorAll('.flag-btn').forEach(function(b) { b.classList.remove('active'); });

          // Reset drag-drop options: move any placed option back to option pool
          var optionPool = document.getElementById('summaryOptions') || document.querySelector('.match-options');
          if (optionPool) {
              document.querySelectorAll('.summary-dropzone .match-option, .match-dropzone .match-option').forEach(function(opt) {
                  opt.style.backgroundColor = '';
                  opt.style.color = '';
                  opt.style.border = '';
                  opt.style.fontWeight = '';
                  optionPool.appendChild(opt);
              });
          }

          document.querySelectorAll('.summary-dropzone, .match-dropzone').forEach(function(d) {
              d.innerHTML = d.dataset.q || ''; // Restore placeholder (question number)
              d.style.backgroundColor = '';
              d.style.color = '';
              d.style.border = '';
          });
          
          // Clear labels styling
          document.querySelectorAll('label').forEach(function(l) {
              l.style.backgroundColor = '';
              l.style.color = '';
              l.style.borderRadius = '';
          });
          
          if (typeof PAPER_ID !== 'undefined') {
              try {
                  window.localStorage.removeItem(PAPER_ID + "_answers");
              } catch(e) {}
          }
      }
      
      // Hook built-in confirmReset so that "重置" 也会清理我们注入的状态
      if (typeof window.confirmReset === 'function' && !window.__ieltsPatchedConfirmReset) {
          window.__ieltsPatchedConfirmReset = true;
          var originalConfirmReset = window.confirmReset;
          window.confirmReset = function() {
              try {
                  originalConfirmReset();
              } finally {
                  try {
                      resetAllInputs();
                  } catch (e) {}
              }
          };
      }
      
      // Auto-reset if requested
      if (window.location.search.indexOf('reset=true') !== -1) {
          setTimeout(resetAllInputs, 100); // Slight delay to override article's loadAnswers
      }

      function convertSelectToRadios() {
          if (typeof answerKey !== 'object') return;
          var selects = document.querySelectorAll('select[name]');
          selects.forEach(function(sel) {
              var name = sel.name;
              if (!name) return;
              if (!answerKey.hasOwnProperty(name)) return;
              if (sel.__convertedToRadios) return;
              sel.__convertedToRadios = true;

              var wrapper = document.createElement('div');
              var options = sel.options;
              for (var i = 0; i < options.length; i++) {
                  var opt = options[i];
                  var val = String(opt.value || '').trim();
                  var text = opt.textContent || val;
                  if (!val) continue;

                  var label = document.createElement('label');
                  label.style.display = 'block';
                  label.style.margin = '4px 0';

                  var radio = document.createElement('input');
                  radio.type = 'radio';
                  radio.name = name;
                  radio.value = val;
                  radio.addEventListener('change', function(e) {
                      sel.value = e.target.value;
                      try {
                          var evt = document.createEvent('Event');
                          evt.initEvent('change', true, true);
                          sel.dispatchEvent(evt);
                      } catch (err) {}
                  });

                  label.appendChild(radio);
                  label.appendChild(document.createTextNode(' ' + text));
                  wrapper.appendChild(label);
              }

              if (wrapper.childNodes.length > 0 && sel.parentNode) {
                  sel.parentNode.insertBefore(wrapper, sel);
                  sel.style.display = 'none';
              }
          });
      }

      function initMarkers() {
          if (typeof answerKey !== 'object') return;
          visibleQuestionIds = [];
          
          convertSelectToRadios();

          // Disable autocomplete globally
          document.querySelectorAll('input[type="text"]').forEach(function(inp) {
              inp.setAttribute('autocomplete', 'off');
          });
          
          // Detect short options for inline display
          try {
             var groups = document.querySelectorAll('.group, .question, .question-block, li');
             groups.forEach(function(g) {
               var labels = g.querySelectorAll('label');
               if (labels.length === 0) return;
               
               var allShort = true;
               var hasLabel = false;
               for (var i = 0; i < labels.length; i++) {
                  hasLabel = true;
                  // Get text content excluding input
                  var clone = labels[i].cloneNode(true);
                  var inp = clone.querySelector('input');
                  if (inp) inp.remove();
                  var txt = clone.textContent.trim();
                  
                  // Allow Single Letters (A-Z) or specific words (TRUE/FALSE/YES/NO/NOT GIVEN) or Roman Numerals
                  // Also allow "Paragraph A", "Section B" etc.
              var isShort = /^[A-Z]$/i.test(txt) || 
                            /^[A-Z]\.?$/i.test(txt) ||
                            /^(TRUE|FALSE|NOT GIVEN|YES|NO)$/i.test(txt) ||
                            /^([ivx]+)$/i.test(txt) ||
                            /^(Paragraph|Section)\s+[A-Z]$/i.test(txt);
                  
                  if (!isShort) {
                      allShort = false;
                      break;
                  }
               }
               
               if (hasLabel && allShort) {
                   g.classList.add('inline-options-container');
               }
             });
          } catch(e) {}

          Object.keys(answerKey).forEach(function(qId) {
             var inputs = document.querySelectorAll(
                 'input[name="' + qId + '"], input[name^="' + qId + '"], input[id="' + qId + '"], input[id^="' + qId + '"]'
             );
             var text = document.querySelector(
                 'input[name="' + qId + '"][type="text"], input[name^="' + qId + '"][type="text"], input[id="' + qId + '"][type="text"], input[id^="' + qId + '"][type="text"]'
             );
             var summaryInput = document.querySelector('.summary-input[data-q="' + qId + '"]');
             var dropzone = document.querySelector('.summary-dropzone[data-q="' + qId + '"], .match-dropzone[data-q="' + qId + '"]');
             
             var hasInteractive = (inputs && inputs.length > 0) || !!text || !!summaryInput || !!dropzone;
             if (!hasInteractive) {
                 var flag = document.querySelector('.flag-btn[data-q="' + qId + '"]');
                 if (!flag) return;
             }
             
             visibleQuestionIds.push(qId);
             
             inputs.forEach(function(inp) {
                  var handler = function(e) {
                      var hasVal = false;
                      if (inp.type === 'checkbox' || inp.type === 'radio') {
                          var group = document.querySelectorAll('input[name="' + inp.name + '"]');
                          for(var i=0; i<group.length; i++) {
                              if(group[i].checked) { hasVal = true; break; }
                          }
                      } else {
                          hasVal = !!inp.value.trim();
                      }
                      notifyParent('ANSWER_UPDATE', { id: qId, hasAnswer: hasVal });
                  };
                  inp.addEventListener('change', handler);
                  inp.addEventListener('input', handler);
                  
                  if (inp.type === 'checkbox' && Array.isArray(answerKey[qId])) {
                      var maxCount = answerKey[qId].length;
                      inp.addEventListener('change', function(e) {
                          var group = document.querySelectorAll(
                              'input[name="' + qId + '"][type="checkbox"],' +
                              'input[name^="' + qId + '"][type="checkbox"],' +
                              'input[id="' + qId + '"][type="checkbox"],' +
                              'input[id^="' + qId + '"][type="checkbox"]'
                          );
                          var checkedCount = 0;
                          group.forEach(function(c) {
                              if (c.checked) checkedCount++;
                          });
                          if (checkedCount > maxCount) {
                              e.target.checked = false;
                          }
                      });
                  }
             });

             if (summaryInput) {
                 var handlerText = function(e) {
                     var hasVal = !!summaryInput.value.trim();
                     notifyParent('ANSWER_UPDATE', { id: qId, hasAnswer: hasVal });
                 };
                 summaryInput.addEventListener('change', handlerText);
                 summaryInput.addEventListener('input', handlerText);
             }

             if (dropzone) {
                 // Use a MutationObserver to detect text changes in dropzones
                 var observer = new MutationObserver(function() {
                     var hasVal = !!dropzone.textContent.trim() && dropzone.textContent.trim() !== dropzone.dataset.q;
                     notifyParent('ANSWER_UPDATE', { id: qId, hasAnswer: hasVal });
                 });
                 observer.observe(dropzone, { childList: true, characterData: true, subtree: true });
             }
          });
          
          if (visibleQuestionIds.length) {
            notifyParent('INIT_QUESTIONS', visibleQuestionIds);
          }
      }

      window.applyInlineResults = function(res) {
        if (!res || !Array.isArray(res) || res.length === 0) return;
        var d = document;

        res.forEach(function (r) {
          if (!r || !r.id) return;
          var id = r.id;

          var container = null;
          var baseInput =
            d.querySelector('input[name="' + id + '"]') ||
            d.querySelector('input[name^="' + id + '"]') ||
            d.getElementById(id) ||
            d.querySelector('input[id^="' + id + '"]') ||
            d.querySelector('.summary-dropzone[data-q="' + id + '"], .match-dropzone[data-q="' + id + '"], .summary-input[data-q="' + id + '"]');

          if (baseInput && baseInput.closest) {
            container =
              baseInput.closest('tr') ||
              baseInput.closest('div.question') ||
              baseInput.closest('.question-block') ||
              ((baseInput.classList.contains('match-dropzone') || baseInput.classList.contains('summary-dropzone')) ? baseInput : baseInput.parentElement);
          }

          if (!container) return;

          var oldMark = container.querySelector('.q-mark');
          if (oldMark) oldMark.remove();

          var mark = d.createElement('span');
          mark.className = 'q-mark';
          mark.style.display = 'inline-flex';
          mark.style.alignItems = 'center';
          mark.style.justifyContent = 'center';
          mark.style.width = '18px';
          mark.style.height = '18px';
          mark.style.marginRight = '6px';
          mark.style.borderRadius = '999px';
          mark.style.border = '2px solid ' + (r.isCorrect ? correctColor : wrongColor);
          mark.style.boxSizing = 'border-box';
          mark.style.fontWeight = 'bold';
          mark.style.fontSize = '12px';
          mark.style.lineHeight = '1';
          mark.textContent = r.isCorrect ? '✓' : '✗';
          mark.style.color = r.isCorrect ? correctColor : wrongColor;
          
          // Insert next to our custom marker if it exists, or at start
          var customMarker = container.querySelector('.custom-marker');
          if (customMarker) {
               if (!container.querySelector('.q-mark')) {
                   customMarker.parentNode.insertBefore(mark, customMarker.nextSibling);
               }
          } else {
               // For dropzones, append to container or insert before
               if (container.classList.contains('match-dropzone')) {
                   if (!container.querySelector('.q-mark')) container.appendChild(mark);
               } else if (container.firstChild) {
                   if (!container.querySelector('.q-mark')) container.insertBefore(mark, container.firstChild);
               } else {
                   if (!container.querySelector('.q-mark')) container.appendChild(mark);
               }
          }

          var textInputs = d.querySelectorAll(
            'input[name="' + id + '"][type="text"], input[name^="' + id + '"][type="text"], input[id="' + id + '"][type="text"], input[id^="' + id + '"][type="text"], .summary-input[data-q="' + id + '"]'
          );
          var radios = d.querySelectorAll(
            'input[name="' + id + '"][type="radio"], input[name^="' + id + '"][type="radio"]'
          );
          var checkboxes = d.querySelectorAll(
            'input[name="' + id + '"][type="checkbox"], input[name^="' + id + '"][type="checkbox"]'
          );
          // Drag and Drop Zone
          var dropzone = d.querySelector('.summary-dropzone[data-q="' + id + '"], .match-dropzone[data-q="' + id + '"]');
          
          if (!dropzone) container.style.backgroundColor = 'transparent';

          var correctList = [];
          if (Array.isArray(r.correctAns)) {
            r.correctAns.forEach(function (v) {
              var s = String(v == null ? '' : v).trim();
              if (s) correctList.push(s.toUpperCase());
            });
          } else if (typeof r.correctAns === 'string' || typeof r.correctAns === 'number') {
            String(r.correctAns).split(',').forEach(function (piece) {
                var s = piece.trim();
                if (s) correctList.push(s.toUpperCase());
            });
          }

          if (dropzone) {
              dropzone.style.border = '2px solid ' + (r.isCorrect ? correctColor : wrongColor);
              dropzone.style.backgroundColor = '#fff';
              
              // Preserve user's dragged answer inside the dropzone
              var userText = dropzone.textContent ? dropzone.textContent.trim() : '';
              dropzone.innerHTML = '';
              
              var userSpan = d.createElement('span');
              userSpan.textContent = userText || (r.isCorrect ? (Array.isArray(r.correctAns) ? r.correctAns.join(', ') : r.correctAns) : '');
              userSpan.style.fontWeight = '600';
              userSpan.style.marginRight = '4px';
              
              if (r.isCorrect) {
                  userSpan.style.color = correctColor;
              } else {
                  userSpan.style.color = wrongColor;
                  userSpan.style.textDecoration = userText ? 'line-through' : 'none';
              }
              
              dropzone.appendChild(userSpan);
              
              // For wrong answers, also show the correct answer next to it
              if (!r.isCorrect && typeof r.correctAns !== 'undefined' && r.correctAns !== null) {
                  var dzCorrectVal = Array.isArray(r.correctAns) ? r.correctAns.join(', ') : r.correctAns;
                  var dzCorrectSpan = d.createElement('span');
                  dzCorrectSpan.textContent = dzCorrectVal;
                  dzCorrectSpan.style.color = correctColor;
                  dzCorrectSpan.style.fontWeight = 'bold';
                  dzCorrectSpan.style.marginLeft = '2px';
                  dropzone.appendChild(dzCorrectSpan);
              }
          }

          if (textInputs && textInputs.length) {
            for (var ti = 0; ti < textInputs.length; ti++) {
              var textInput = textInputs[ti];
              textInput.setAttribute('autocomplete', 'off');

              if (textInput.nextSibling && textInput.nextSibling.className === 'correct-answer-display') {
                textInput.parentNode.removeChild(textInput.nextSibling);
              }

              var userValText = r.userAns == null ? '' : String(r.userAns);
              var correctValText = Array.isArray(r.correctAns) ? r.correctAns.join(', ') : r.correctAns;

              textInput.setAttribute('data-user-answer', userValText);

              if (!r.isCorrect && typeof r.correctAns !== 'undefined' && r.correctAns !== null) {
                textInput.value = correctValText != null ? String(correctValText) : '';
                textInput.style.color = wrongColor;
                textInput.style.textDecoration = 'none';
              } else {
                textInput.value = userValText;
                textInput.style.color = correctColor;
                textInput.style.textDecoration = 'none';
              }

              textInput.style.fontWeight = '600';
              textInput.style.border = 'none';
              textInput.style.borderBottom = '1px solid ' + (r.isCorrect ? correctColor : wrongColor);
              textInput.style.background = 'transparent';
              textInput.style.outline = 'none';
              textInput.style.padding = '0 4px';
            }
          }

          var handleChoiceGroup = function (inputs, isMulti, questionCorrect) {
            if (!inputs || !inputs.length) return;

            // Clear old styles
            for (var i = 0; i < inputs.length; i++) {
              var inp = inputs[i];
              var label = (inp.closest && inp.closest('label')) || inp.parentElement;
              if (inp && inp.style) {
                inp.style.accentColor = '';
                inp.style.outline = '';
                inp.style.outlineOffset = '';
                inp.style.boxShadow = '';
              }
              if (label) {
                label.style.backgroundColor = '';
                label.style.color = '';
                label.style.fontWeight = '';
                label.style.borderRadius = '';
                label.style.padding = '';
                label.style.textDecoration = '';
              }
            }

            for (var j = 0; j < inputs.length; j++) {
              var input = inputs[j];
              var val = String(input.value || '').trim().toUpperCase();
              var isCorrectOption = correctList.indexOf(val) !== -1;
              var lbl = (input.closest && input.closest('label')) || input.parentElement;
              var isChecked = !!input.checked;

              if (isCorrectOption) {
                // Correct option always highlighted in green
                if (lbl) {
                    lbl.style.backgroundColor = '#f6ffed';
                    lbl.style.borderRadius = '4px';
                    lbl.style.color = correctColor;
                    lbl.style.fontWeight = 'bold';
                }
                input.style.accentColor = correctColor;
                // Add ring for unchecked correct answers to make them visible
                if (!isChecked) {
                     input.style.boxShadow = '0 0 0 1px ' + correctColor;
                }
              } else if (isChecked) {
                // User's wrong choice highlighted in red
                input.style.accentColor = wrongColor; 
                if (lbl) {
                    lbl.style.backgroundColor = '#fee2e2';
                    lbl.style.borderRadius = '4px';
                    lbl.style.color = wrongColor;
                }
              }
            }
          };

          handleChoiceGroup(radios, false, !!r.isCorrect);
          handleChoiceGroup(checkboxes, true, !!r.isCorrect);
          
          // Color flag-btn if exists
          var flagBtn = container.querySelector('.flag-btn[data-q="' + id + '"]');
          if (flagBtn) {
              flagBtn.style.backgroundColor = r.isCorrect ? correctColor : wrongColor;
          }
        });

        d.querySelectorAll('input[type="radio"],input[type="checkbox"],input[type="text"]').forEach(function (inp) {
            inp.disabled = true;
        });
      };

      // Expose answer extraction helper
      window.extractUserAnswers = function() {
          var d = document;
          var userAnswers = {};
          if (typeof answerKey !== 'object') return userAnswers;
          
          var keys = visibleQuestionIds && visibleQuestionIds.length ? visibleQuestionIds : Object.keys(answerKey);
          
          keys.forEach(function (q) {
            var uA = '';
            var radioChecked =
              d.querySelector('input[name="' + q + '"][type="radio"]:checked') ||
              d.querySelector('input[name^="' + q + '"][type="radio"]:checked') ||
              d.querySelector('input[id="' + q + '"][type="radio"]:checked') ||
              d.querySelector('input[id^="' + q + '"][type="radio"]:checked');
            var radios = d.querySelectorAll(
              'input[name="' + q + '"][type="radio"], input[name^="' + q + '"][type="radio"], input[id="' + q + '"][type="radio"], input[id^="' + q + '"][type="radio"]'
            );
            if (radioChecked) {
              uA = radioChecked.value;
            } else if (radios.length === 0) {
              var checkboxes = d.querySelectorAll('input[name^="' + q + '"][type="checkbox"], input[id^="' + q + '"][type="checkbox"]');
              if (checkboxes.length > 0) {
                var arr = [];
                checkboxes.forEach(function (c) {
                  if (c.checked) arr.push(c.value);
                });
                uA = arr.join(',');
              } else {
                var text =
                  d.querySelector('input[name="' + q + '"][type="text"]') ||
                  d.querySelector('input[name^="' + q + '"][type="text"]') ||
                  d.querySelector('input[id="' + q + '"][type="text"]') ||
                  d.querySelector('input[id^="' + q + '"][type="text"]') ||
                  d.querySelector('.summary-input[data-q="' + q + '"]');
                if (text) {
                  if (text.disabled) {
                    var stored = text.getAttribute('data-user-answer');
                    uA = (stored != null ? stored : text.value).trim();
                  } else {
                    uA = (text.value || '').trim();
                  }
                }
              }
              
              if (!uA) {
                  var dz = d.querySelector('.summary-dropzone[data-q="' + q + '"], .match-dropzone[data-q="' + q + '"]');
                  if (dz) {
                      var child = dz.querySelector('.match-option');
                      if (child) {
                          uA = child.getAttribute('data-value') || child.innerText.trim();
                      } else {
                          uA = dz.innerText.trim();
                      }
                  }
              }
            }
            userAnswers[q] = uA;
          });
          return userAnswers;
      };

      window.applyUserAnswers = function(map) {
          if (!map || typeof map !== 'object') return;
          if (typeof answerKey !== 'object') return;
          var keys = visibleQuestionIds && visibleQuestionIds.length ? visibleQuestionIds : Object.keys(answerKey);
          
          keys.forEach(function(q) {
              if (!map.hasOwnProperty(q)) return;
              var val = map[q];
              var radios = d.querySelectorAll(
                'input[name="' + q + '"][type="radio"], input[name^="' + q + '"][type="radio"], input[id="' + q + '"][type="radio"], input[id^="' + q + '"][type="radio"]'
              );
              var checkboxes = d.querySelectorAll(
                'input[name="' + q + '"][type="checkbox"], input[name^="' + q + '"][type="checkbox"], input[id="' + q + '"][type="checkbox"], input[id^="' + q + '"][type="checkbox"]'
              );
              var text =
                d.querySelector('input[name="' + q + '"][type="text"]') ||
                d.querySelector('input[name^="' + q + '"][type="text"]') ||
                d.querySelector('input[id="' + q + '"][type="text"]') ||
                d.querySelector('input[id^="' + q + '"][type="text"]') ||
                d.querySelector('.summary-input[data-q="' + q + '"]');
              
              var hasVal = false;
              
              if (radios.length) {
                  radios.forEach(function(radio) {
                      var checked = String(radio.value).trim().toUpperCase() === String(val || '').trim().toUpperCase();
                      radio.checked = checked;
                      if (checked) hasVal = true;
                  });
              } else if (checkboxes.length) {
                  var parts = String(val || '').split(',').map(function(s){ return s.trim().toUpperCase(); });
                  checkboxes.forEach(function(cb) {
                      var checked = parts.indexOf(String(cb.value).trim().toUpperCase()) !== -1;
                      cb.checked = checked;
                      if (checked) hasVal = true;
                  });
              } else if (text) {
                  var v = val == null ? '' : String(val);
                  text.value = v;
                  text.setAttribute('data-user-answer', v);
                  hasVal = v.trim().length > 0;
              }
              
              notifyParent('ANSWER_UPDATE', { id: q, hasAnswer: hasVal });
          });
      };

      function internalSubmit() {
          if (typeof answerKey !== 'object') return;
          var userMap = window.extractUserAnswers();
          var res = [];
          var keys = visibleQuestionIds && visibleQuestionIds.length ? visibleQuestionIds : Object.keys(answerKey);
          keys.forEach(function (q) {
            var uA = userMap[q];
            var cA = answerKey[q];
            var correct = false;
            if (Array.isArray(cA)) {
              var setUser = new Set(String(uA).split(',').map(function (v) { return v.trim().toLowerCase(); }).filter(Boolean));
              var setCorrect = new Set(cA.map(function (v) { return String(v).toLowerCase(); }));
              if (setUser.size === setCorrect.size) {
                correct = true;
                setCorrect.forEach(function (v) {
                  if (!setUser.has(v)) correct = false;
                });
              }
            } else if (uA) {
              if (normalizeText(uA) === normalizeText(cA)) correct = true;
            }
            res.push({ id: q, userAns: uA, correctAns: cA, isCorrect: correct });
          });
          
          var correctCount = 0;
          for (var i = 0; i < res.length; i++) {
              if (res[i].isCorrect) correctCount++;
          }
          var totalCount = res.length;
          
          try {
              if (typeof PAPER_ID !== 'undefined') {
                  window.localStorage.setItem('ielts_score_' + PAPER_ID, String(correctCount) + '/' + String(totalCount));
                  window.localStorage.setItem('ielts_result_' + PAPER_ID, JSON.stringify(res));
                  window.localStorage.removeItem('ielts_draft_' + PAPER_ID);
              }
          } catch (e) {}
          
          var modal = document.getElementById('resultModal');
          if (modal) modal.classList.remove('active');
          
          window.applyInlineResults(res);
          notifyParent('RESULTS', res);
      }
      
      var isSingle = ${isSingleArticle};
      if (isSingle) {
          window.__IELTS_SINGLE_WRAPPED = true;
      }
      var originalSubmit = window.submitAnswers;
      
      if (isSingle && typeof originalSubmit === 'function' && typeof answerKey === 'object') {
        window.submitAnswers = internalSubmit;
      }

      if (document.readyState === 'complete') initMarkers();
      else window.addEventListener('load', initMarkers);
    })();
  `;
  doc.body.appendChild(inlineScript);

  if (!isSingleArticle) return;
  if (doc.getElementById('custom-splitter')) return;

  const shell = doc.querySelector('#shell') || doc.body;
  const left = doc.querySelector('#left') || doc.querySelector('.article') || doc.querySelector('div:first-child');
  const right = doc.querySelector('#right') || doc.querySelector('.questions') || doc.querySelector('div:last-child');

  if (shell && left && right && right.parentNode === shell) {
    shell.style.display = 'flex';
    shell.style.flexDirection = 'row';
    shell.style.height = '100vh';
    shell.style.overflow = 'hidden';
    
    left.style.flex = '0 0 50%';
    left.style.overflowY = 'auto';
    left.style.padding = '20px';
    left.style.height = '100%';
    
    right.style.flex = '1';
    right.style.overflowY = 'auto';
    right.style.padding = '20px';
    right.style.height = '100%';

    const splitter = doc.createElement('div');
    splitter.id = 'custom-splitter';
    splitter.style.width = '2px';
    splitter.style.cursor = 'col-resize';
    splitter.style.background = '#e5e7eb';
    splitter.style.display = 'flex';
    splitter.style.alignItems = 'center';
    splitter.style.justifyContent = 'center';
    splitter.style.zIndex = '100';
    splitter.innerHTML = '<div style="width:2px; height:20px; background:#9ca3af; border-radius:1px;"></div>';
    
    shell.insertBefore(splitter, right);

    let isDragging = false;
    
    const onMouseDown = (e) => {
      isDragging = true;
      doc.body.style.cursor = 'col-resize';
      doc.body.style.userSelect = 'none';
    };

    const onMouseUp = () => {
      isDragging = false;
      doc.body.style.cursor = '';
      doc.body.style.userSelect = '';
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const shellRect = shell.getBoundingClientRect();
      const relativeX = e.clientX - shellRect.left;
      const widthPercent = (relativeX / shellRect.width) * 100;
      
      if (widthPercent > 10 && widthPercent < 90) {
        left.style.flex = `0 0 ${widthPercent}%`;
      }
    };

    splitter.addEventListener('mousedown', onMouseDown);
    doc.addEventListener('mouseup', onMouseUp);
    doc.addEventListener('mousemove', onMouseMove);
  }
}
