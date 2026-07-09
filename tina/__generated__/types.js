export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const ArticlesPartsFragmentDoc = gql`
    fragment ArticlesParts on Articles {
  __typename
  title
  date
  author
  category
  excerpt
  coverImage
  body
}
    `;
export const EventsPartsFragmentDoc = gql`
    fragment EventsParts on Events {
  __typename
  title
  date
  endDate
  location
  type
  description
  coverImage
  body
}
    `;
export const FacultyPartsFragmentDoc = gql`
    fragment FacultyParts on Faculty {
  __typename
  name
  title
  specialization
  email
  bio
  photo
  status
}
    `;
export const StaffPartsFragmentDoc = gql`
    fragment StaffParts on Staff {
  __typename
  name
  role
  department
  email
  phone
  photo
}
    `;
export const TestimonialsPartsFragmentDoc = gql`
    fragment TestimonialsParts on Testimonials {
  __typename
  name
  graduationYear
  currentRole
  quote
  photo
}
    `;
export const CoursesPartsFragmentDoc = gql`
    fragment CoursesParts on Courses {
  __typename
  code
  name
  semester
  credits
  description
  pdfUrl
}
    `;
export const PageHomePartsFragmentDoc = gql`
    fragment PageHomeParts on PageHome {
  __typename
  pageType
  pageId
  title
  hero {
    __typename
    eyebrow
    title_line1
    title_line2
    description
    cta_text
    cta_link
    secondary_text
    secondary_link
  }
  quickAccess {
    __typename
    title
    items {
      __typename
      title
      subtitle
      subtitle_desktop
      href
      aria_label
    }
  }
  news {
    __typename
    tag
    category
    title
    description
    image
    image_alt
    link_text
    link_href
    secondary {
      __typename
      category
      title
      date
      href
    }
  }
  video {
    __typename
    eyebrow
    title
    badge
    video_id
    duration
    description
  }
  footer {
    __typename
    email
    phone
    schedule
    social_instagram
    social_twitter
    social_youtube
  }
}
    `;
export const PageContactPartsFragmentDoc = gql`
    fragment PageContactParts on PageContact {
  __typename
  pageType
  pageId
  title
  subtitle
  items {
    __typename
    title
    description
    detail
    icon
    href
  }
}
    `;
export const PageHistoryPartsFragmentDoc = gql`
    fragment PageHistoryParts on PageHistory {
  __typename
  pageType
  pageId
  title
  body
  items {
    __typename
    title
    description
    detail
  }
  stats {
    __typename
    value
    label
  }
}
    `;
export const PageGraduateProfilePartsFragmentDoc = gql`
    fragment PageGraduateProfileParts on PageGraduateProfile {
  __typename
  pageType
  pageId
  title
  body
  items {
    __typename
    title
    description
    icon
  }
  headings {
    __typename
    title
    items
  }
}
    `;
export const PageInternshipsPartsFragmentDoc = gql`
    fragment PageInternshipsParts on PageInternships {
  __typename
  pageType
  pageId
  title
  body
  requirements
  modalities {
    __typename
    title
    description
    icon
  }
  formUrl
  contact {
    __typename
    name
    role
    email
    phone
    office
  }
}
    `;
export const PageAssociationPartsFragmentDoc = gql`
    fragment PageAssociationParts on PageAssociation {
  __typename
  pageType
  pageId
  title
  body
  activities
  participationText
  alert {
    __typename
    title
    body
  }
}
    `;
export const PageGroupsPartsFragmentDoc = gql`
    fragment PageGroupsParts on PageGroups {
  __typename
  pageType
  pageId
  title
  body
  groups {
    __typename
    title
    description
    detail
    icon
  }
  workshops {
    __typename
    title
    description
    detail
    icon
  }
  cta {
    __typename
    title
    body
    label
  }
}
    `;
export const PageCommunityPartsFragmentDoc = gql`
    fragment PageCommunityParts on PageCommunity {
  __typename
  pageType
  pageId
  title
  body
  descriptionItems
  requirements
  cta {
    __typename
    title
    body
    label
  }
  alert {
    __typename
    title
    body
  }
}
    `;
export const PageAdmissionProcessPartsFragmentDoc = gql`
    fragment PageAdmissionProcessParts on PageAdmissionProcess {
  __typename
  pageType
  pageId
  title
  subtitle
  eyebrow
  body
  items {
    __typename
    title
    description
    detail
    icon
    emphasis
  }
}
    `;
export const PageAdmissionRequirementsPartsFragmentDoc = gql`
    fragment PageAdmissionRequirementsParts on PageAdmissionRequirements {
  __typename
  pageType
  pageId
  title
  subtitle
  eyebrow
  items {
    __typename
    title
    description
  }
  headings {
    __typename
    title
    items
  }
}
    `;
export const PageAlumniTestimonialsPartsFragmentDoc = gql`
    fragment PageAlumniTestimonialsParts on PageAlumniTestimonials {
  __typename
  pageType
  pageId
  title
  subtitle
  eyebrow
  body
}
    `;
export const PageContinuingEducationPartsFragmentDoc = gql`
    fragment PageContinuingEducationParts on PageContinuingEducation {
  __typename
  pageType
  pageId
  title
  subtitle
  eyebrow
  body
  items {
    __typename
    title
    description
    detail
    icon
    href
  }
}
    `;
export const PageEventsListingPartsFragmentDoc = gql`
    fragment PageEventsListingParts on PageEventsListing {
  __typename
  pageType
  pageId
  title
  subtitle
  body
  cta {
    __typename
    title
    body
    label
  }
  emptyState {
    __typename
    title
    body
    label
  }
}
    `;
export const PageCurriculumPartsFragmentDoc = gql`
    fragment PageCurriculumParts on PageCurriculum {
  __typename
  pageType
  pageId
  title
  pdfUrl
  headings {
    __typename
    title
    description
  }
}
    `;
export const PageCourseContentPartsFragmentDoc = gql`
    fragment PageCourseContentParts on PageCourseContent {
  __typename
  pageType
  pageId
  title
  body
}
    `;
export const PageMissionPartsFragmentDoc = gql`
    fragment PageMissionParts on PageMission {
  __typename
  pageType
  pageId
  title
  headings {
    __typename
    title
    description
    eyebrow
  }
  items {
    __typename
    title
    description
  }
}
    `;
export const ArticlesDocument = gql`
    query articles($relativePath: String!) {
  articles(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ArticlesParts
  }
}
    ${ArticlesPartsFragmentDoc}`;
export const ArticlesConnectionDocument = gql`
    query articlesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ArticlesFilter) {
  articlesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ArticlesParts
      }
    }
  }
}
    ${ArticlesPartsFragmentDoc}`;
export const EventsDocument = gql`
    query events($relativePath: String!) {
  events(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EventsParts
  }
}
    ${EventsPartsFragmentDoc}`;
export const EventsConnectionDocument = gql`
    query eventsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EventsFilter) {
  eventsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EventsParts
      }
    }
  }
}
    ${EventsPartsFragmentDoc}`;
export const FacultyDocument = gql`
    query faculty($relativePath: String!) {
  faculty(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FacultyParts
  }
}
    ${FacultyPartsFragmentDoc}`;
export const FacultyConnectionDocument = gql`
    query facultyConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FacultyFilter) {
  facultyConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FacultyParts
      }
    }
  }
}
    ${FacultyPartsFragmentDoc}`;
export const StaffDocument = gql`
    query staff($relativePath: String!) {
  staff(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...StaffParts
  }
}
    ${StaffPartsFragmentDoc}`;
export const StaffConnectionDocument = gql`
    query staffConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: StaffFilter) {
  staffConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...StaffParts
      }
    }
  }
}
    ${StaffPartsFragmentDoc}`;
export const TestimonialsDocument = gql`
    query testimonials($relativePath: String!) {
  testimonials(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TestimonialsParts
  }
}
    ${TestimonialsPartsFragmentDoc}`;
export const TestimonialsConnectionDocument = gql`
    query testimonialsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TestimonialsFilter) {
  testimonialsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TestimonialsParts
      }
    }
  }
}
    ${TestimonialsPartsFragmentDoc}`;
export const CoursesDocument = gql`
    query courses($relativePath: String!) {
  courses(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CoursesParts
  }
}
    ${CoursesPartsFragmentDoc}`;
export const CoursesConnectionDocument = gql`
    query coursesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CoursesFilter) {
  coursesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CoursesParts
      }
    }
  }
}
    ${CoursesPartsFragmentDoc}`;
export const PageHomeDocument = gql`
    query pageHome($relativePath: String!) {
  pageHome(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageHomeParts
  }
}
    ${PageHomePartsFragmentDoc}`;
export const PageHomeConnectionDocument = gql`
    query pageHomeConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageHomeFilter) {
  pageHomeConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageHomeParts
      }
    }
  }
}
    ${PageHomePartsFragmentDoc}`;
export const PageContactDocument = gql`
    query pageContact($relativePath: String!) {
  pageContact(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageContactParts
  }
}
    ${PageContactPartsFragmentDoc}`;
export const PageContactConnectionDocument = gql`
    query pageContactConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageContactFilter) {
  pageContactConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageContactParts
      }
    }
  }
}
    ${PageContactPartsFragmentDoc}`;
export const PageHistoryDocument = gql`
    query pageHistory($relativePath: String!) {
  pageHistory(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageHistoryParts
  }
}
    ${PageHistoryPartsFragmentDoc}`;
export const PageHistoryConnectionDocument = gql`
    query pageHistoryConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageHistoryFilter) {
  pageHistoryConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageHistoryParts
      }
    }
  }
}
    ${PageHistoryPartsFragmentDoc}`;
export const PageGraduateProfileDocument = gql`
    query pageGraduateProfile($relativePath: String!) {
  pageGraduateProfile(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageGraduateProfileParts
  }
}
    ${PageGraduateProfilePartsFragmentDoc}`;
export const PageGraduateProfileConnectionDocument = gql`
    query pageGraduateProfileConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageGraduateProfileFilter) {
  pageGraduateProfileConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageGraduateProfileParts
      }
    }
  }
}
    ${PageGraduateProfilePartsFragmentDoc}`;
export const PageInternshipsDocument = gql`
    query pageInternships($relativePath: String!) {
  pageInternships(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageInternshipsParts
  }
}
    ${PageInternshipsPartsFragmentDoc}`;
export const PageInternshipsConnectionDocument = gql`
    query pageInternshipsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageInternshipsFilter) {
  pageInternshipsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageInternshipsParts
      }
    }
  }
}
    ${PageInternshipsPartsFragmentDoc}`;
export const PageAssociationDocument = gql`
    query pageAssociation($relativePath: String!) {
  pageAssociation(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageAssociationParts
  }
}
    ${PageAssociationPartsFragmentDoc}`;
export const PageAssociationConnectionDocument = gql`
    query pageAssociationConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageAssociationFilter) {
  pageAssociationConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageAssociationParts
      }
    }
  }
}
    ${PageAssociationPartsFragmentDoc}`;
export const PageGroupsDocument = gql`
    query pageGroups($relativePath: String!) {
  pageGroups(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageGroupsParts
  }
}
    ${PageGroupsPartsFragmentDoc}`;
export const PageGroupsConnectionDocument = gql`
    query pageGroupsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageGroupsFilter) {
  pageGroupsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageGroupsParts
      }
    }
  }
}
    ${PageGroupsPartsFragmentDoc}`;
export const PageCommunityDocument = gql`
    query pageCommunity($relativePath: String!) {
  pageCommunity(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageCommunityParts
  }
}
    ${PageCommunityPartsFragmentDoc}`;
export const PageCommunityConnectionDocument = gql`
    query pageCommunityConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageCommunityFilter) {
  pageCommunityConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageCommunityParts
      }
    }
  }
}
    ${PageCommunityPartsFragmentDoc}`;
export const PageAdmissionProcessDocument = gql`
    query pageAdmissionProcess($relativePath: String!) {
  pageAdmissionProcess(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageAdmissionProcessParts
  }
}
    ${PageAdmissionProcessPartsFragmentDoc}`;
export const PageAdmissionProcessConnectionDocument = gql`
    query pageAdmissionProcessConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageAdmissionProcessFilter) {
  pageAdmissionProcessConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageAdmissionProcessParts
      }
    }
  }
}
    ${PageAdmissionProcessPartsFragmentDoc}`;
export const PageAdmissionRequirementsDocument = gql`
    query pageAdmissionRequirements($relativePath: String!) {
  pageAdmissionRequirements(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageAdmissionRequirementsParts
  }
}
    ${PageAdmissionRequirementsPartsFragmentDoc}`;
export const PageAdmissionRequirementsConnectionDocument = gql`
    query pageAdmissionRequirementsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageAdmissionRequirementsFilter) {
  pageAdmissionRequirementsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageAdmissionRequirementsParts
      }
    }
  }
}
    ${PageAdmissionRequirementsPartsFragmentDoc}`;
export const PageAlumniTestimonialsDocument = gql`
    query pageAlumniTestimonials($relativePath: String!) {
  pageAlumniTestimonials(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageAlumniTestimonialsParts
  }
}
    ${PageAlumniTestimonialsPartsFragmentDoc}`;
export const PageAlumniTestimonialsConnectionDocument = gql`
    query pageAlumniTestimonialsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageAlumniTestimonialsFilter) {
  pageAlumniTestimonialsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageAlumniTestimonialsParts
      }
    }
  }
}
    ${PageAlumniTestimonialsPartsFragmentDoc}`;
export const PageContinuingEducationDocument = gql`
    query pageContinuingEducation($relativePath: String!) {
  pageContinuingEducation(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageContinuingEducationParts
  }
}
    ${PageContinuingEducationPartsFragmentDoc}`;
export const PageContinuingEducationConnectionDocument = gql`
    query pageContinuingEducationConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageContinuingEducationFilter) {
  pageContinuingEducationConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageContinuingEducationParts
      }
    }
  }
}
    ${PageContinuingEducationPartsFragmentDoc}`;
export const PageEventsListingDocument = gql`
    query pageEventsListing($relativePath: String!) {
  pageEventsListing(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageEventsListingParts
  }
}
    ${PageEventsListingPartsFragmentDoc}`;
export const PageEventsListingConnectionDocument = gql`
    query pageEventsListingConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageEventsListingFilter) {
  pageEventsListingConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageEventsListingParts
      }
    }
  }
}
    ${PageEventsListingPartsFragmentDoc}`;
export const PageCurriculumDocument = gql`
    query pageCurriculum($relativePath: String!) {
  pageCurriculum(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageCurriculumParts
  }
}
    ${PageCurriculumPartsFragmentDoc}`;
export const PageCurriculumConnectionDocument = gql`
    query pageCurriculumConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageCurriculumFilter) {
  pageCurriculumConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageCurriculumParts
      }
    }
  }
}
    ${PageCurriculumPartsFragmentDoc}`;
export const PageCourseContentDocument = gql`
    query pageCourseContent($relativePath: String!) {
  pageCourseContent(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageCourseContentParts
  }
}
    ${PageCourseContentPartsFragmentDoc}`;
export const PageCourseContentConnectionDocument = gql`
    query pageCourseContentConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageCourseContentFilter) {
  pageCourseContentConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageCourseContentParts
      }
    }
  }
}
    ${PageCourseContentPartsFragmentDoc}`;
export const PageMissionDocument = gql`
    query pageMission($relativePath: String!) {
  pageMission(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageMissionParts
  }
}
    ${PageMissionPartsFragmentDoc}`;
export const PageMissionConnectionDocument = gql`
    query pageMissionConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageMissionFilter) {
  pageMissionConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageMissionParts
      }
    }
  }
}
    ${PageMissionPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    articles(variables, options) {
      return requester(ArticlesDocument, variables, options);
    },
    articlesConnection(variables, options) {
      return requester(ArticlesConnectionDocument, variables, options);
    },
    events(variables, options) {
      return requester(EventsDocument, variables, options);
    },
    eventsConnection(variables, options) {
      return requester(EventsConnectionDocument, variables, options);
    },
    faculty(variables, options) {
      return requester(FacultyDocument, variables, options);
    },
    facultyConnection(variables, options) {
      return requester(FacultyConnectionDocument, variables, options);
    },
    staff(variables, options) {
      return requester(StaffDocument, variables, options);
    },
    staffConnection(variables, options) {
      return requester(StaffConnectionDocument, variables, options);
    },
    testimonials(variables, options) {
      return requester(TestimonialsDocument, variables, options);
    },
    testimonialsConnection(variables, options) {
      return requester(TestimonialsConnectionDocument, variables, options);
    },
    courses(variables, options) {
      return requester(CoursesDocument, variables, options);
    },
    coursesConnection(variables, options) {
      return requester(CoursesConnectionDocument, variables, options);
    },
    pageHome(variables, options) {
      return requester(PageHomeDocument, variables, options);
    },
    pageHomeConnection(variables, options) {
      return requester(PageHomeConnectionDocument, variables, options);
    },
    pageContact(variables, options) {
      return requester(PageContactDocument, variables, options);
    },
    pageContactConnection(variables, options) {
      return requester(PageContactConnectionDocument, variables, options);
    },
    pageHistory(variables, options) {
      return requester(PageHistoryDocument, variables, options);
    },
    pageHistoryConnection(variables, options) {
      return requester(PageHistoryConnectionDocument, variables, options);
    },
    pageGraduateProfile(variables, options) {
      return requester(PageGraduateProfileDocument, variables, options);
    },
    pageGraduateProfileConnection(variables, options) {
      return requester(PageGraduateProfileConnectionDocument, variables, options);
    },
    pageInternships(variables, options) {
      return requester(PageInternshipsDocument, variables, options);
    },
    pageInternshipsConnection(variables, options) {
      return requester(PageInternshipsConnectionDocument, variables, options);
    },
    pageAssociation(variables, options) {
      return requester(PageAssociationDocument, variables, options);
    },
    pageAssociationConnection(variables, options) {
      return requester(PageAssociationConnectionDocument, variables, options);
    },
    pageGroups(variables, options) {
      return requester(PageGroupsDocument, variables, options);
    },
    pageGroupsConnection(variables, options) {
      return requester(PageGroupsConnectionDocument, variables, options);
    },
    pageCommunity(variables, options) {
      return requester(PageCommunityDocument, variables, options);
    },
    pageCommunityConnection(variables, options) {
      return requester(PageCommunityConnectionDocument, variables, options);
    },
    pageAdmissionProcess(variables, options) {
      return requester(PageAdmissionProcessDocument, variables, options);
    },
    pageAdmissionProcessConnection(variables, options) {
      return requester(PageAdmissionProcessConnectionDocument, variables, options);
    },
    pageAdmissionRequirements(variables, options) {
      return requester(PageAdmissionRequirementsDocument, variables, options);
    },
    pageAdmissionRequirementsConnection(variables, options) {
      return requester(PageAdmissionRequirementsConnectionDocument, variables, options);
    },
    pageAlumniTestimonials(variables, options) {
      return requester(PageAlumniTestimonialsDocument, variables, options);
    },
    pageAlumniTestimonialsConnection(variables, options) {
      return requester(PageAlumniTestimonialsConnectionDocument, variables, options);
    },
    pageContinuingEducation(variables, options) {
      return requester(PageContinuingEducationDocument, variables, options);
    },
    pageContinuingEducationConnection(variables, options) {
      return requester(PageContinuingEducationConnectionDocument, variables, options);
    },
    pageEventsListing(variables, options) {
      return requester(PageEventsListingDocument, variables, options);
    },
    pageEventsListingConnection(variables, options) {
      return requester(PageEventsListingConnectionDocument, variables, options);
    },
    pageCurriculum(variables, options) {
      return requester(PageCurriculumDocument, variables, options);
    },
    pageCurriculumConnection(variables, options) {
      return requester(PageCurriculumConnectionDocument, variables, options);
    },
    pageCourseContent(variables, options) {
      return requester(PageCourseContentDocument, variables, options);
    },
    pageCourseContentConnection(variables, options) {
      return requester(PageCourseContentConnectionDocument, variables, options);
    },
    pageMission(variables, options) {
      return requester(PageMissionDocument, variables, options);
    },
    pageMissionConnection(variables, options) {
      return requester(PageMissionConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
