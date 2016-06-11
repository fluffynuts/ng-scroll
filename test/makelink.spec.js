const sinon = require('sinon');
const expect = require('chai').expect;
const makeLink = require('../src/makeLink');

describe('makeLink', () => {
  it('should export a function', () => {
    // Arrange
    // Act
    expect(makeLink).to.be.a('function');
    // Assert
  });
  describe(':export', () => {
    it('should return a function', () => {
      // Arrange
      // Act
      const result = makeLink();
      // Assert
      expect(result).to.be.a('function');
    })
    describe(':result function', () => {
      function create(attribute, applyFn) {
        attribute = attribute || 'some-attribute';
        applyFn = applyFn || function() { return true; };
        return makeLink(attribute, applyFn);
      }
      function createScope() {
        return {
          $apply: function(fn) {
            fn();
          },
          $eval: function() {}
        }
      }
      function createElement() {
        return {
          bind: sinon.stub()
        };
      }
      function createAttrs(directiveAttr, attrValue) {
        const result = {}
        result[directiveAttr || 'some-attribute'] = attrValue || 'some-value';
        return result;
      }
      function createEv(howMuch) {
        return {
          wheelDelta: howMuch,
          preventDefault: sinon.stub()
        };
      }
      it('should bind the provided element on wheel events', () => {
        // Arrange
        const 
          sut = create(),
          scope = createScope(),
          el = createElement(),
          attrs = createAttrs()
        // Act
        sut(scope, el, attrs);
        // Assert
        expect(el.bind).to.have.been.calledOnce;
        const args = el.bind.firstCall.args;
        expect(args[0]).to.equal('DOMMouseScroll mousewheel');
        expect(args[1]).to.be.a('function');
      });
      it('should apply if the applyIf function returns true', () => {
        // Arrange
        const 
          applyIf = sinon.stub().returns(true),
          attrs = createAttrs()
          sut = create('some-attribute', applyIf),
          scope = createScope(),
          el = createElement(),
          delta = 0.5,
          ev = createEv(delta),
          scopeApplySpy = sinon.spy(scope, '$apply'),
          scopeEvalSpy = sinon.spy(scope, '$eval');
        // Act
        sut(scope, el, attrs);
        // Assert
        const handler = el.bind.firstCall.args[1];
        handler(ev)
        expect(applyIf).to.have.been.calledWith(delta);
        expect(scopeApplySpy).to.have.been.calledOnce;
        expect(scopeEvalSpy).to.have.been.calledOnce;
        expect(scopeEvalSpy).to.have.been.calledWith(attrs['some-attribute']);
        expect(ev.preventDefault).to.have.been.calledOnce;
      });
    })
  });
})