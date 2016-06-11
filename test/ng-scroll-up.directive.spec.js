const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const proxies = {
  './makeLink': sinon.stub()
}
const sut = proxyquire('../src/ng-scroll-up.directive', proxies);

describe(':scroll-down', () => {
  it('should return a function', () => {
    expect(sut).to.be.a('function');
  });
  describe(':fn', () => {
    function createMod() {
      return {
        directive: sinon.stub()
      }
    }
    it('will call directive on the provided mod', () => {
      // Arrange
      const mod = createMod();
      // Act
      sut(mod);
      // Assert
      expect(mod.directive).to.have.been.calledOnce;
      const args = mod.directive.firstCall.args;
      expect(args[0]).to.equal('ngScrollUp');
      expect(args[1]).to.be.a('function');
    });
    describe(':directive', () => {
      it('should return the expected directive definition', () => {
        // Arrange
        const
          mod = createMod(),
          expected = {},
          stub = proxies['./makeLink'];
        stub.returns(expected);
        sut(mod);
        const fn = mod.directive.firstCall.args[1];
        // Act
        const result = fn();
        // Assert
        expect(result.restrict).to.equal('A');
        expect(stub).to.have.been.calledOnce;
        const args = stub.firstCall.args;
        expect(args[0]).to.equal('ngScrollUp');
        expect(args[1]).to.be.a('function');
        const linkFn = args[1];
        expect(linkFn(1)).to.be.true;
        expect(linkFn(0)).to.be.false;
        expect(linkFn(-1)).to.be.false;
        expect(result.link).to.equal(expected);
      });
    })
  })
});