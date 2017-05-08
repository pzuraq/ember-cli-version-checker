'use strict';

const path = require('path');
const resolve = require('resolve');
const DependencyVersionChecker = require('./dependency-version-checker');

class NPMDependencyVersionChecker extends DependencyVersionChecker {
  constructor(parent, name) {
    super(parent, name);

    let addon = this._parent._addon;
    let project = addon.project;
    let nodeModulesPath = project.nodeModulesPath || path.join(project.root, 'node_modules');

    let jsonPath;
    try {
      jsonPath = resolve.sync(this.name + '/package.json', { basedir: addon.root || nodeModulesPath });
    } catch(e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        jsonPath = null;
      } else {
        throw e;
      }
    }

    this._jsonPath = jsonPath;
    this._type = 'npm';
  }
}

module.exports = NPMDependencyVersionChecker;
