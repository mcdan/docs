import { Heading } from 'components/shared/heading';
import { Breadcrumbs } from 'components/templates/doc-page/breadcrumbs';
import styles from 'components/templates/doc-page/doc-page.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { Link } from 'gatsby';
import { DocLayout } from 'layouts/doc-layout';
import React from 'react';
import { childrenToList, slugify } from 'utils';

export default function (props) {
  const {
    pageContext: {
      sidebarTree,
      breadcrumbs,
      navLinks,
      title,
      directChildren,
      locale,
      translations = null,
    },
  } = props;

  const pageMetadata = {
    data: {
      title,
      description: ' ',
    },
  };

  return (
    <LocaleProvider urlLocale={locale}>
      <DocLayout
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        locale={locale}
        pageTranslations={translations}
        pageMetadata={pageMetadata}
      >
        <div className={`${styles.container}`}>
          <Breadcrumbs items={breadcrumbs} label={styles.breadcrumbsStub} />
          <Heading className={styles.title}>{title}</Heading>
          <ul className={styles.sectionList}>
            {childrenToList(directChildren).map(({ meta, name }, i) => (
              <li key={`bcl-${i}`}>
                {meta.redirect ? (
                  <a href={meta.redirect} className={'link'}>
                    {meta.title ? meta.title : name}
                  </a>
                ) : (
                  <Link
                    to={`${meta.path || slugify(`/${name}`)}`}
                    className={'link'}
                  >
                    {meta.title ? meta.title : name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
