describe('Project run form run with limit', () => {
	it('should be loaded by url', () => {
		cy.visit('/projects/run');
		cy.location('pathname')
			.should('equal', '/projects/run');
	});

	const runProjectParams = {
		projectName: 'some_project',
		branchName: 'master',
		playbookName: 'sample_shell_calls',
		inventories: ['sample'],
		limit: 'some_server_one,some_server_two'
	};

	it('select project, branch, playbook, inventories, limit', () => {
		cy.fillProjectRunForm(runProjectParams);
	});

	it('click on run button', () => {
		cy.get('button:contains(Run):not(.disabled)').click();
	});

	it('should redirect to build page', () => {
		cy.location('pathname')
			.should('match', new RegExp('/builds/\\d+'));
	});

	it('build page should contain info according to run params', () => {
		cy.expectBuildPageInfo(runProjectParams);
	});
});
