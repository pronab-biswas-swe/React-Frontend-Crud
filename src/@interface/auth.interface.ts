import { IObject } from "./common.interface";

export interface IAuthInfo {
  accessToken: string;
  refreshToken: string;
  id?: string;
}

export interface IUserRole {
  id: string;
  titleEn: string;
  titleBn: string;
  roleCode: string;
  isDefault: boolean;
}

export interface IOrgPostDTO {
  id: string;
  nameEn: string;
  nameBn: string;
}

export interface IemployeeOrgPost {
  id: string;
  post: IOrgPostDTO;
  organization: IOrgPostDTO;
}

export interface IUserInfo {
  id: string;
  primaryEmail: string;
  primaryMobile: string;
  employeeOrgPost: IemployeeOrgPost;
  post: IOrgPostDTO;
  organization: IOrgPostDTO;
  userName: string;
  nidSmart: string;
  isLocked: boolean;
  isActive: boolean;
  organizationId: string;
  dateOfBirth: number;
  nameEn: string;
  nameBn: string;
  roles: IUserRole[];
  imageUrl: string;
  userPermissionDTO: IObject;
}

export interface IAuthInfo {
	accessToken: string;
	refreshToken: string;
	id?: string;
}

export interface IUserRole {
	id: string;
	createdBy: string;
	isDeleted: boolean;
	titleEn: string;
	titleBn: string;
	roleCode: string;
	isActive: boolean;
	isSystem: boolean;
	isDefault: boolean;
	isSupport: boolean;
	isUnderOfficeAdminRole: boolean;
}

export interface IOrgPostDTO {
	id: string;
	nameEn: string;
	nameBn: string;
}

export interface ICategoryDTO {
	id: string;
	titleEn: string;
	titleBn: string;
}

export interface IPostingInfo {
	id?: string;
	postingCategoryKey?: string;
	postingCategory?: ICategoryDTO;
	psToDTO?: IOrgPostDTO;
	osdCategoryKey?: string;
	osdCategory?: ICategoryDTO;
	postingOrganizationId?: string;
	postingOrganizationDto: IOrgPostDTO;
	postId?: string;
	postDTO: IOrgPostDTO;
	lienPostId?: string;
	lienPostDTO?: IOrgPostDTO;
	lienOrgName?: string;
	postingJoiningDate?: number;
	postingOrderDate?: number;
	releasePostingDate?: number;
	organizationPost?:IObject;
}

export interface IUserInfo {
	appointingAuthority: IOrgPostDTO;
	batch: IObject;
	cadre: IObject;
	controllingAuthority: IOrgPostDTO;
	createdBy: string;
	dateOfBirth: number;
	fullNameBn: string;
	fullNameEn: string;
	gender: string;
	govtId: string;
	hasPostingUnderOrder: boolean;
	id: string;
	imageUrl: string;
	isActive: boolean;
	isDeleted: boolean;
	isLocked: boolean;
	joiningId: string;
	maritalStatus: string;
	nameBn: string;
	nameEn: string;
	nid: string;
	nidOld: string;
	nidSmart: string;
	organizationId: string;
	ownDistrict: string;
	placeOfBirth: string;
	postId: string;
	posting: IPostingInfo;
	postingId: string;
	primaryEmail: string;
	primaryMobile: string;
	promotionId: string;
	religion: string;
	// roles?: IUserRole[];
	serviceType: string;
	thumbnailUrl: string;
	underOrderPosting?: IPostingInfo;
	underOrderPostingId?: string;
	userName: string;
	// userPermissionDTO?: {
	// 	cadreList?: IObject[];
	// 	emsApproverRankList?: IObject[];
	// 	emsReviewerRankList?: IObject[];
	// 	goTypeList?: IObject[];
	// 	organizationList?: IObject[];
	// 	sitemapList?: ISiteMap[];
	// };
}

